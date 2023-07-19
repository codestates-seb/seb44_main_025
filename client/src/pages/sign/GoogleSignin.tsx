import { Styled_Sign } from './Sign.styled';
import Header from '../../components/header/Header';
import { ButtonPrimary160px } from '../../components/buttons/Buttons';
import PageMovement from '../../components/sign/PageMovement';
import { SubmitHandler, useForm } from 'react-hook-form';
import { gmailRegExp } from '../../utils/RegExp';
import { H1Title } from '../../utils/SlideUp';
import GoogleLoginButton from '../../components/oauth/OAuth';
import { SignIn } from '../../model/Member';
import { usePostSignIn } from '../../api/sign';

const GoogleSignin = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignIn>();

  /** 입력한 값들을 react-hook-form의 SubmitHandler를 통해 객체(data)로 받는 함수 */
  const onSubmit: SubmitHandler<SignIn> = data => {
    usePostSignIn(data, '/login');
  };

  return (
    <>
      <Header precious={true} />
      <Styled_Sign.Main>
        <Styled_Sign.Container>
          <Styled_Sign.H1 marginBottom={145}>
            <H1Title.H1>
              <H1Title.H1span>Google로 로그인</H1Title.H1span>
            </H1Title.H1>
          </Styled_Sign.H1>
          <Styled_Sign.Form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
                <label htmlFor="email">이메일</label>
                <div>
                  <Styled_Sign.Input
                    width={360}
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
                    <p>반드시 입력해야 합니다</p>
                  </div>
                ) : null}
              </div>
            </div>
            <ButtonPrimary160px>로그인하기</ButtonPrimary160px>
          </Styled_Sign.Form>
          <Styled_Sign.SocialSignIn>
            <GoogleLoginButton />
          </Styled_Sign.SocialSignIn>
          <PageMovement
            infoText="아직 계정이 없으신가요?"
            pagelink="/signup"
            linkedText="회원가입"
            marginTop={20}
          />
        </Styled_Sign.Container>
      </Styled_Sign.Main>
    </>
  );
};

export default GoogleSignin;
