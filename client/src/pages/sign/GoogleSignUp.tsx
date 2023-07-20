import { Styled_Sign } from './Sign.styled';
import Header from '../../components/header/Header';
import { ButtonPrimary160px } from '../../components/buttons/Buttons';
import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import PageMovement from '../../components/sign/PageMovement';
import { ErrorMessage } from '@hookform/error-message';
import { gmailRegExp, nicknameRegExp } from '../../utils/RegExp';
import { H1Title } from '../../theme/common/SlideUp';
import { useGetDuplicateNickname } from '../../api/duplication';
import { usePostSignUp } from '../../api/sign';
import { SignUp } from '../../model/Member';
import GoogleButton from '../../components/buttons/GoogleButton';

const GoogleSignUp = () => {
  /** 중복여부
   * @true :중복됨
   * @false :중복되지 않음
   */
  let [nicknameDupl, setNicknameDupl] = useState(false);
  /** 중복확인버튼 클릭 여부
   * 0 :누르지 않음
   * 1~ :누름
   */
  let [nicknameDuplBtnCnt, setNicknameDuplBtnCnt] = useState(0);
  /** 중복확인 클릭하지 않고 submit 했을 때
   * @ture :중복확인 X
   * @false :중복확인 O
   */
  let [noNicknameDuplBtnClickedSubmit, setNoNicknameDuplBtnClickedSubmit] =
    useState(true);

  let [submitClicked, setSubmitClicked] = useState(false);

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUp>({
    criteriaMode: 'all',
  });

  /** 닉네임 현재값 (중복확인시 사용)*/
  const input_nickname = useRef<string | null>(null);
  input_nickname.current = watch('nickname');

  /** 닉네임의 중복검사 여부를 확인 후 ajax함수를 실행시키는 함수 */
  const onSubmit: SubmitHandler<SignUp> = data => {
    setSubmitClicked(true);
    if (!noNicknameDuplBtnClickedSubmit) {
      if (!nicknameDupl) {
        /** 회원정보 전송 */
        usePostSignUp(
          data,
          '[회원가입 성공] 홈으로 이동합니다',
          '/member',
          '/'
        );
      } else {
        if (nicknameDupl) {
          if (nicknameDuplBtnCnt > 0) {
            setNoNicknameDuplBtnClickedSubmit(true);
          }
        }
      }
    }
  };

  /** 중복검사 */
  const handleDuplicateCheck = async (nickname: string | null) => {
    if (typeof nickname === 'string') {
      useGetDuplicateNickname(nickname)
        .then(response => {
          if (response.status === 200) {
            if (response.data === false) {
              setNicknameDupl(false);
              setNicknameDuplBtnCnt(nicknameDuplBtnCnt + 1);
              setNoNicknameDuplBtnClickedSubmit(false);
            } else if (response.data === true) {
              setNicknameDupl(true);
              setNicknameDuplBtnCnt(0);
              setNoNicknameDuplBtnClickedSubmit(false);
            }
          }
        })
        .catch(err => {
          alert(err);
        });
    }
  };

  return (
    <>
      <Header precious={true} />
      <Styled_Sign.Main>
        <Styled_Sign.Container>
          <Styled_Sign.H1 marginBottom={75}>
            <H1Title.H1>
              <H1Title.H1span>Google로 회원가입</H1Title.H1span>
            </H1Title.H1>
          </Styled_Sign.H1>
          <Styled_Sign.Form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
                <label htmlFor="email">이메일</label>
                <div>
                  <Styled_Sign.Input
                    {...register('email', {
                      required: true,
                      pattern: gmailRegExp,
                    })}
                  />
                </div>
                {errors.email ? (
                  <div>
                    <p>@gmail.com으로 끝나야 합니다</p>
                  </div>
                ) : null}
              </div>
              <div>
                <label htmlFor="password">비밀번호</label>
                <Styled_Sign.Input
                  type="password"
                  {...register('password', {
                    required: true,
                  })}
                />
                {errors.password ? (
                  <div>
                    <p>반드시 작성해야 합니다</p>
                  </div>
                ) : null}
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
                      handleDuplicateCheck(input_nickname.current);
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
          <GoogleButton naviUrl="/googlelogin" title="로그인" />
        </Styled_Sign.Container>
      </Styled_Sign.Main>
    </>
  );
};

export default GoogleSignUp;
