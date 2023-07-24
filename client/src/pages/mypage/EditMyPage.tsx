import S from './EditMyPage.style';
import Header from '../../components/header/Header';
import {
  ButtonPrimary75px,
  ButtonHighlightBorder,
} from '../../components/buttons/Buttons';
import { Input } from '../../components/inputs/Inputs';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { H1Title } from '../../theme/common/SlideUp';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { nicknameRegExp, passwordRegExp } from '../../utils/RegExp';
import axios from 'axios';
import { getCookie } from '../../utils/Cookie';
import { useGetMember } from '../../api/useFetch';

const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

interface Edit {
  nickname: string;
  password: string;
  password_confirm: string;
  id?: number;
  onchange: () => void;
}

export default function Editmypage() {
  const navigate = useNavigate();
  const userInfo = getCookie('userInfo');
  const { memberId } = useParams();

  // 중복이면 true = 못사용함
  const [nicknameDupl, setNicknameDupl] = useState(true);
  // 중복버튼 눌렀는지 false = 누르지 않음
  const [clickNicknameDupl, setClickNicknameDupl] = useState(false);
  // 중복클릭 없이 서브밋버튼을 눌렀는지 false = 중복버튼 안누름
  const [submitNonClickDupl, setSubmitNonClickDupl] = useState(false);
  // 중복확인 성공여부
  const [successDupl, setSuccessDupl] = useState(false);
  // useform 사용 방법
  const { handleSubmit, control, watch, setValue } = useForm<Edit>();
  /** 비밀번호 현재값 (비밀번호 확인란에서 사용)*/
  const password = watch('password', '');

  // member의 기존 nickname을 요청하며 렌더링 될때는 undefiend이기 때문에 useEffect로 값을 받아올때마다 재렌더링하고 setValue를 통하여 name이 nickname인곳으로 값에 전달
  const memberNickname = useGetMember();
  useEffect(() => {
    if (memberNickname?.nickname) {
      setValue('nickname', memberNickname.nickname);
    }
  }, [memberNickname, setValue]);

  useEffect(() => {
    if (memberId && getCookie('userInfo')?.memberId !== +memberId) {
      alert('권한 접근이 없습니다.');
      navigate('/');
      return;
    }
  }, []);

  /** 회원정보를 서버로 전송하는 ajax 함수 */
  const usePatchMember = (id?: string | number | undefined, data?: any) => {
    delete data.password_confirm;
    axios
      .patch(
        `${SERVER_HOST}/member`,
        // JSON.stringify(data),
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: getCookie('accessToken'),
          },
        }
      )
      .then(response => {
        if (response.status === 200) {
          alert('[회원수정 성공] 마이페이지로 이동합니다');
          navigate(`/mypage/${userInfo?.memberId}`);
        }
      })
      .catch(error => {
        alert(`error: ${error}`);
      });
  };

  const onSubmit: SubmitHandler<Edit> = data => {
    // 값이 true=버튼을 눌렀다면
    if (submitNonClickDupl) {
      // 값이 fales=중복이 아니라면
      if (!nicknameDupl) {
        usePatchMember(memberId, data);
      } else {
        if (nicknameDupl) {
          if (clickNicknameDupl) {
            setSubmitNonClickDupl(false);
          }
        }
      }
    } else {
      alert('중복을 확인해주세요');
    }
  };

  /** 닉네임 중복검사하는 ajax 함수 */
  const useGetDuplicateNickname = (nicknameData: string | null): void => {
    if (typeof nicknameData === 'string') {
      axios
        .post(`${SERVER_HOST}/member/duplicate/nickname`, {
          nickname: nicknameData,
        })
        .then(response => {
          if (response.status === 200) {
            // 사용 가능한 이메일일 경우
            if (response.data === false) {
              console.log(response);
              setNicknameDupl(false);
              setClickNicknameDupl(true);
              setSubmitNonClickDupl(true);
              setSuccessDupl(true);
            }
            // 이미 사용중인 이메일일 경우
            else if (response.data === true) {
              setNicknameDupl(true);
              setClickNicknameDupl(false);
              setSubmitNonClickDupl(false);
              setSuccessDupl(false);
              alert('이미 사용중인 닉네임 입니다');
            }
          }
        })
        .catch(err => {
          alert(`error: ${err?.response?.data?.fieldErrors[0]?.reason}`);
        });
    }
  };

  return (
    <>
      <Header precious={true} />
      <S.Main>
        <S.Section>
          <S.Title>
            <H1Title.H1span>개인정보 수정하기</H1Title.H1span>
          </S.Title>
          <S.UserDetail>
            <S.SubTitle>로그인 아이디</S.SubTitle>
            <S.HighlightButtonWarppar>
              <Link to="/cancel">
                <ButtonHighlightBorder>회원탈퇴</ButtonHighlightBorder>
              </Link>
            </S.HighlightButtonWarppar>

            <form onSubmit={handleSubmit(onSubmit)}>
              <S.InputContainer>
                <S.InputLabel>닉네임</S.InputLabel>
                <Controller
                  control={control}
                  name="nickname"
                  rules={{
                    required: '중복을 확인해주세요',
                    pattern: {
                      value: nicknameRegExp,
                      message:
                        '닉네임은 한글 또는 영문을 띄어쓰기 없이 사용해야 합니다',
                    },
                    minLength: {
                      value: 2,
                      message: '닉네임은 2자 이상 12자 이하여야 합니다',
                    },
                    maxLength: {
                      value: 12,
                      message: '닉네임은 2자 이상 12자 이하여야 합니다',
                    },
                  }}
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <Input
                        value={field.value}
                        width={285}
                        buttonText={'중복확인'}
                        onChange={field.onChange}
                        onClick={e => {
                          e.preventDefault();
                          useGetDuplicateNickname(field.value);
                        }}
                        errorMessage={error?.message}
                        successMessage={successDupl ? '중복확인 성공' : ''}
                      />
                    );
                  }}
                />
              </S.InputContainer>
              <S.InputContainer>
                <S.InputLabel>비밀번호 변경</S.InputLabel>
                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: '반드시 입력해야 합니다',
                    pattern: {
                      value: passwordRegExp,
                      message:
                        '비밀번호는 8~16자의 영문, 숫자, 특수문자로 이루어져야 합니다',
                    },
                  }}
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <Input
                        value={field.value}
                        type="password"
                        width={360}
                        onChange={field.onChange}
                        errorMessage={error?.message}
                      />
                    );
                  }}
                />
              </S.InputContainer>
              <S.InputContainer>
                <S.InputLabel>비밀번호 변경 확인</S.InputLabel>
                <Controller
                  control={control}
                  name="password_confirm"
                  rules={{
                    required: '반드시 입력해야 합니다',
                    pattern: {
                      value: passwordRegExp,
                      message: '비밀번호가 일치하지 않습니다',
                    },
                    validate: value => value === password,
                  }}
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <>
                        <Input
                          value={field.value}
                          type="password"
                          width={360}
                          onChange={field.onChange}
                          errorMessage={error?.message}
                        />
                      </>
                    );
                  }}
                />
              </S.InputContainer>
              <S.ButtonWarppar>
                <ButtonPrimary75px>수정</ButtonPrimary75px>
              </S.ButtonWarppar>
            </form>
          </S.UserDetail>
        </S.Section>
      </S.Main>
    </>
  );
}
