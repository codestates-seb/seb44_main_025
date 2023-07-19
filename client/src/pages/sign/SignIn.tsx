import { Styled_Sign } from './Sign.styled';
import Header from '../../components/header/Header';
import { ButtonPrimary160px } from '../../components/buttons/Buttons';
import axios from 'axios';
import PageMovement from '../../components/sign/PageMovement';
import { SubmitHandler, useForm } from 'react-hook-form';
import { emailRegExp } from '../../utils/RegExp';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../utils/Cookie';
import { H1Title } from '../../theme/common/SlideUp';
import GoogleLoginButton from '../../components/oauth/OAuth';
import { useUserInfo } from '../../zustand/userInfo.stores';

const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

interface IForm {
  email: string;
  password: string;
}

const SignInPage = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useUserInfo();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IForm>();

  const ajaxPostSignIn = (data: IForm) => {
    axios
      .post(`${SERVER_HOST}/login`, data)
      .then(response => {
        // 헤더에 담긴 토큰 가져오기
        const accessToken = response.headers['authorization'];
        if (response.status === 200) {
          // token이 필요한 API 요청 시 header Authorization에 token 담아 전송
          axios.defaults.headers.common['authorization'] = `${accessToken}`;

          setUserInfo({
            memberId: response.data.memberId,
            hasArtist: response.data.hasArtist,
          });

          // 쿠키 저장
          setCookie(
            'userInfo',
            JSON.stringify({
              memberId: response.data.memberId,
              hasArtist: response.data.hasArtist,
            }),
            { path: '/' }
          );
          setCookie('accessToken', `${accessToken}`, {
            path: '/',
            sameSite: 'strict',
            secure: true,
          });
          setCookie('refreshToken', response.data.refreshToken, {
            path: '/',
            sameSite: 'strict',
            secure: true,
          });

          // 메인페이지로 이동
          alert('[로그인 성공] 메인 페이지로 이동합니다');
          navigate('/');
        }
      })
      .catch(() => {
        alert('이메일과 비밀번호를 확인해 주세요');
      });
  };

  /** 입력한 값들을 react-hook-form의 SubmitHandler를 통해 객체(data)로 받는 함수 */
  const onSubmit: SubmitHandler<IForm> = data => {
    ajaxPostSignIn(data);
  };

  return (
    <>
      <Header precious={true} />
      <Styled_Sign.Main>
        <Styled_Sign.Container>
          <Styled_Sign.H1 marginBottom={145}>
            <H1Title.H1>
              <H1Title.H1span>Ez to 로그인</H1Title.H1span>
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
                      pattern: emailRegExp,
                    })}
                  />
                </div>
                {errors?.email ? (
                  <div>
                    <p>이메일 형식에 맞게 입력해주세요</p>
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
                {errors?.password ? (
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

export default SignInPage;
