import { Styled_Sign } from './Sign.styled';
import Header from '../../components/header/Header';
import { ButtonPrimary160px } from '../../components/buttons/Buttons';
import { useRef, useState } from 'react';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import PageMovement from '../../components/sign/PageMovement';
import { ErrorMessage } from '@hookform/error-message';
import {
  emailRegExp,
  passwordRegExp,
  nicknameRegExp,
} from '../../utils/RegExp';
import { useNavigate } from 'react-router-dom';

interface IForm {
  email: string;
  password: string;
  password_confirm: string;
  nickname: string;
}

const SignUpPage = () => {
  /** 중복여부
   * @true :중복되지 않음
   * @false :중복됨
   */
  let [emailDupl, setEmailDupl] = useState(false);
  let [nicknameDupl, setNicknameDupl] = useState(false);
  /** 중복확인버튼 클릭 여부 */
  let [emailDuplBtnCnt, setEmailDuplBtnCnt] = useState(0);
  let [nicknameDuplBtnCnt, setNicknameDuplBtnCnt] = useState(0);
  /** 중복확인 클릭하지 않고 submit 했을 때
   * @ture :중복확인 X
   * @false :중복확인 O
   */
  let [noEmailDuplBtnClickedSubmit, setNoEmailDuplBtnClickedSubmit] =
    useState(true);
  let [noNicknameDuplBtnClickedSubmit, setNoNicknameDuplBtnClickedSubmit] =
    useState(true);
  let [submitClicked, setSubmitClicked] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<IForm>({
    criteriaMode: 'all',
  });

  /** email 현재값 (중복확인시 사용)*/
  const input_email = useRef<string | null>(null);
  input_email.current = watch('email');
  /** 비밀번호 현재값 (비밀번호 확인란에서 사용)*/
  const input_password = useRef<string | null>(null);
  input_password.current = watch('password');
  /** 닉네임 현재값 (중복확인시 사용)*/
  const input_nickname = useRef<string | null>(null);
  input_nickname.current = watch('nickname');

  /** 아이디와 닉네임의 중복검사 여부를 확인 후 ajax함수를 실행시키는 함수
   * 입력한 값들을 react-hook-form의 SubmitHandler를 통해 객체(data)로 받는다
   */
  const onSubmit: SubmitHandler<IForm> = data => {
    setSubmitClicked(true);
    if (!noEmailDuplBtnClickedSubmit && !noNicknameDuplBtnClickedSubmit) {
      if (!emailDupl && !nicknameDupl) {
        usePostSignUp(data);
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
  const usePostSignUp = (data: IForm) => {
    axios
      .post('https://103f-121-187-22-182.ngrok-free.app/member', data, {
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

  /** 이메일 중복검사하는 ajax 함수 */
  const useGetDuplicateEmail = (emailData: string | null) => {
    axios
      .post(
        'https://103f-121-187-22-182.ngrok-free.app/member/duplicate/email',
        { email: emailData }
      )
      .then(response => {
        if (response.status === 200) {
          if (response.data === false) {
            setEmailDupl(false);
            setEmailDuplBtnCnt(nicknameDuplBtnCnt + 1);
            setNoEmailDuplBtnClickedSubmit(false);
          } else if (response.data === true) {
            setEmailDupl(true);
            setEmailDuplBtnCnt(0);
            setNoEmailDuplBtnClickedSubmit(false);
          }
        }
      })
      .catch(err => {
        alert(`error: ${err}`);
      });
  };

  /** 닉네임 중복검사하는 ajax 함수 */
  const useGetDuplicateNickname = (nicknameData: string | null) => {
    axios
      .post(
        'https://103f-121-187-22-182.ngrok-free.app/member/duplicate/nickname',
        { nickname: nicknameData }
      )
      .then(response => {
        if (response.status === 200) {
          if (response.data === '사용 가능한 이메일입니다') {
            setNicknameDupl(false);
            setNicknameDuplBtnCnt(emailDuplBtnCnt + 1);
            setNoNicknameDuplBtnClickedSubmit(false);
          } else if (response.data === '이미 존재하는 이메일입니다') {
            setNicknameDupl(true);
            setNicknameDuplBtnCnt(0);
            setNoNicknameDuplBtnClickedSubmit(false);
          }
        }
      })
      .catch(err => {
        alert(`error: ${err}`);
      });
  };

  /** 중복검사시 이메일, 닉네임 분기하는 함수 */
  const DuplicateCheck = (
    email: string | null,
    nickname: string | null
  ): void => {
    // 이메일 중복확인 클릭시
    if (typeof email === 'string' && nickname === '') {
      useGetDuplicateEmail(email);
    }
    // 닉네임 중복확인 클릭시
    if (email === '' && typeof nickname === 'string') {
      useGetDuplicateNickname(nickname);
    }
  };

  return (
    <>
      <Header precious={true} />
      <Styled_Sign.Main>
        <Styled_Sign.Container>
          <Styled_Sign.H1 mb={75}>Ez to 회원가입</Styled_Sign.H1>
          <Styled_Sign.Form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
                <label htmlFor="email">이메일</label>
                <div>
                  <Styled_Sign.Input
                    width={285}
                    {...register('email', {
                      required: true,
                      pattern: emailRegExp,
                      onChange: () => setNoEmailDuplBtnClickedSubmit(true),
                    })}
                  />
                  <Styled_Sign.ButtonSpan
                    onClick={() => {
                      DuplicateCheck(input_email.current, '');
                    }}
                  >
                    중복확인
                  </Styled_Sign.ButtonSpan>
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
                <Styled_Sign.Input
                  type="password"
                  {...register('password', {
                    required: true,
                    pattern: passwordRegExp,
                  })}
                />
                {errors.password && (
                  <p>
                    비밀번호는 8~16자의 영문, 숫자, 특수문자로 이루어져야 합니다
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="password_fonfirm">비밀번호 확인</label>
                <Styled_Sign.Input
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
                  <Styled_Sign.Input
                    width={285}
                    {...register('nickname', {
                      required:
                        '닉네임은 한글 또는 영문을 띄어쓰기 없이 사용해야 합니다',
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
                      onChange: () => setNoNicknameDuplBtnClickedSubmit(true),
                    })}
                  />
                  <Styled_Sign.ButtonSpan
                    onClick={() => {
                      DuplicateCheck('', input_nickname.current);
                    }}
                  >
                    중복확인
                  </Styled_Sign.ButtonSpan>
                </div>
                <ErrorMessage
                  errors={errors}
                  name="nickname"
                  render={({ messages }) => {
                    console.log('messages', messages);
                    return (
                      messages &&
                      Object.entries(messages).map(([type, message]) => (
                        <p key={type}>{message}</p>
                      ))
                    );
                  }}
                />
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
          </Styled_Sign.Form>
          <PageMovement
            infoText="이미 계정이 있으신가요?"
            pagelink="/login"
            linkedText="로그인"
            marginTop={50}
          />
        </Styled_Sign.Container>
      </Styled_Sign.Main>
    </>
  );
};

export default SignUpPage;
