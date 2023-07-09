import S from './Sign.styled';
import HeaderOnlyP from '../../components/Header/HeaderOnlyP';
import { ButtonPrimary160px } from '../../components/Buttons/Buttons';
import { useRef } from 'react';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import PageMovement from '../../components/Sign/PageMovement';
import {
  emailRegExp,
  passwordRegExp,
  nicknameRegExp,
} from '../../utils/RegExp';
import {
  emailDuplication,
  nicknameDuplication,
  emailDuplBtnCounter,
  nicknameDuplBtnCounter,
  noEmailDuplSubmit,
  noNicknameDuplSubmit,
  IsSubmitClicked,
} from '../../constants/Duplication';
import { useNavigate } from 'react-router-dom';

interface IForm {
  email: string;
  password: string;
  password_confirm: string;
  nickname: string;
}

const SignUpPage = () => {
  const { emailDupl, setEmailDupl } = emailDuplication();
  const { nicknameDupl, setNicknameDupl } = nicknameDuplication();
  const { emailDuplBtnCnt, setEmailDuplBtnCnt } = emailDuplBtnCounter();
  const { nicknameDuplBtnCnt, setNicknameDuplBtnCnt } =
    nicknameDuplBtnCounter();
  const { noEmailDuplBtnClickedSubmit, setNoEmailDuplBtnClickedSubmit } =
    noEmailDuplSubmit();
  const { noNicknameDuplBtnClickedSubmit, setNoNicknameDuplBtnClickedSubmit } =
    noNicknameDuplSubmit();
  const { submitClicked, setSubmitClicked } = IsSubmitClicked();
  const navigate = useNavigate();

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<IForm>();

  /** email 현재값 (중복확인시 사용)*/
  const input_email = useRef<string | null>(null);
  input_email.current = watch('email');
  /** 비밀번호 현재값 (비밀번호 확인란에서 사용)*/
  const input_password = useRef<string | null>(null);
  input_password.current = watch('password');
  /** 닉네임 현재값 (중복확인시 사용)*/
  const input_nickname = useRef<string | null>(null);
  input_nickname.current = watch('nickname');

  /** 입력한 값들을 react-hook-form의 SubmitHandler를 통해 객체(data)로 받는 함수 */
  const onSubmit: SubmitHandler<IForm> = data => {
    setSubmitClicked(true);
    if (!noEmailDuplBtnClickedSubmit && !noNicknameDuplBtnClickedSubmit) {
      if (!emailDupl && !nicknameDupl) {
        ajaxPostSignUp(data);
        console.log(noNicknameDuplBtnClickedSubmit);
      } else {
        if (emailDupl) {
          if (emailDuplBtnCnt > 0) {
            setNoEmailDuplBtnClickedSubmit(true);
          }
        }
        if (nicknameDupl) {
          if (nicknameDuplBtnCnt > 0) {
            setNoNicknameDuplBtnClickedSubmit(true);
          }
        }
      }
    }
  };
  /** 회원정보를 서버로 전송하는 ajax 함수 */
  const ajaxPostSignUp = (data: IForm) => {
    // console.log(data);
    // alert('회원가입 성공');
    // navigate('/login');
    axios
      .post('/signup', data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(response => {
        if (response.status === 200) {
          alert('[회원가입 성공] 로그인 페이지로 이동합니다');
          navigate('/login');
        }
      })
      .catch(error => {
        alert(`error: ${error}`);
      });
  };

  /** 중복 확인하는 함수
   * @todo 중복확인 로직 구현
   */
  const DuplicateCheck = (
    email: string | null,
    nickname: string | null
  ): void => {
    if (typeof email === 'string' && nickname === '') {
      if (email === 'hello@naver.com') {
        setEmailDupl(false);
        setEmailDuplBtnCnt();
        setNoEmailDuplBtnClickedSubmit(false);
      } else {
        setEmailDupl(true);
        setEmailDuplBtnCnt();
        setNoEmailDuplBtnClickedSubmit(false);
      }
    }
    if (email === '' && typeof nickname === 'string') {
      // 중복검사를 통과한 경우
      if (nickname === 'hello') {
        setNicknameDupl(false);
        setNicknameDuplBtnCnt();
        setNoNicknameDuplBtnClickedSubmit(false);
      }
      // 통과하지 못 한 경우
      else {
        setNicknameDupl(true);
        setNicknameDuplBtnCnt();
        setNoNicknameDuplBtnClickedSubmit(false);
      }
    }
  };

  return (
    <>
      <HeaderOnlyP />
      <S.Main>
        <S.Container>
          <S.H1>Ez to 회원가입</S.H1>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
                <label htmlFor="email">이메일</label>
                <div>
                  <S.Input
                    width={285}
                    {...register('email', {
                      required: true,
                      pattern: emailRegExp,
                      onChange: () => setNoEmailDuplBtnClickedSubmit(true),
                    })}
                  />
                  <S.ButtonSpan
                    onClick={() => {
                      DuplicateCheck(input_email.current, '');
                    }}
                  >
                    중복확인
                  </S.ButtonSpan>
                </div>
                <div>
                  {errors.email && <p>이메일 형식에 맞게 입력해주세요</p>}
                </div>
                {noEmailDuplBtnClickedSubmit ? (
                  submitClicked === true ? (
                    <p>중복확인을 해주세요</p>
                  ) : null
                ) : emailDupl ? (
                  <p>같은 이메일이 이미 존재합니다</p>
                ) : emailDuplBtnCnt > 0 ? (
                  <p style={{ color: 'var(--input-border-color)' }}>
                    {' '}
                    사용 가능한 이메일입니다
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor="password">비밀번호</label>
                <S.Input
                  type="password"
                  {...register('password', {
                    required: true,
                    pattern: passwordRegExp,
                  })}
                />
                {errors.password && (
                  <p>비밀번호는 8~16자의 영문, 숫자로 이루어져야 합니다</p>
                )}
              </div>
              <div>
                <label htmlFor="password_fonfirm">비밀번호 확인</label>
                <S.Input
                  type="password"
                  {...register('password_confirm', {
                    required: true,
                    validate: value => value === input_password.current,
                  })}
                />
                {errors.password_confirm && <p>비밀번호가 다릅니다</p>}
              </div>
              <div>
                <label htmlFor="nickname">닉네임</label>
                <div>
                  <S.Input
                    width={285}
                    {...register('nickname', {
                      required: true,
                      pattern: nicknameRegExp,
                      onChange: () => setNoNicknameDuplBtnClickedSubmit(true),
                    })}
                  />
                  <S.ButtonSpan
                    onClick={() => {
                      DuplicateCheck('', input_nickname.current);
                    }}
                  >
                    중복확인
                  </S.ButtonSpan>
                </div>
                {errors.nickname && (
                  <p>닉네임은 한글 또는 영문으로 이루어져야 합니다</p>
                )}
                {noNicknameDuplBtnClickedSubmit ? (
                  submitClicked === true ? (
                    <p>중복확인을 해주세요</p>
                  ) : null
                ) : nicknameDupl ? (
                  <p>같은 닉네임이 이미 존재합니다</p>
                ) : nicknameDuplBtnCnt > 0 ? (
                  <p style={{ color: 'var(--input-border-color)' }}>
                    사용 가능한 닉네임입니다
                  </p>
                ) : null}
              </div>
            </div>
            <ButtonPrimary160px>회원가입하기</ButtonPrimary160px>
          </S.Form>
          <PageMovement
            infoText="이미 계정이 있으신가요?"
            pagelink="/login"
            linkedText="로그인"
          />
        </S.Container>
      </S.Main>
    </>
  );
};

export default SignUpPage;
