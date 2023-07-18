import { Styled_Sign } from './Sign.styled';
import Header from '../../components/header/Header';
import { ButtonPrimary160px } from '../../components/buttons/Buttons';
import axios from 'axios';
import PageMovement from '../../components/sign/PageMovement';
import {Controller, FormProvider, SubmitHandler, useForm, useFormContext} from 'react-hook-form';
import { emailRegExp } from '../../utils/RegExp';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../utils/Cookie';
import { H1Title } from '../../utils/SlideUp';
import GoogleLoginButton from '../../components/oauth/OAuth';

const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

interface IForm {
  email: string;
  password: string;
  // password_confirm: string;
  // nickname: string;
}

const Input = (props:{label:string; name:string }) => {
  const {control} = useFormContext();
  const {label,name}=props
  return (
      <Controller
          name={name}
          control={control}
          rules={{
            required: true,
            pattern: name === 'email' ? emailRegExp : undefined,
          }}
          render={({field,formState:{errors}})=> (
          <div>
            <div>{label}</div>
            <div>
              <Styled_Sign.Input
                  type={name}
                  width={360}
                  value={field.value}
                  onChange={(e:any)=> field.onChange(e.target.value)}
              />
            </div>
            {errors?.[name] ? <div><p>{name !=='email' ? '비밀번호를 입력하세요.' : '이메일 형식에 맞게 입력해주세요'}</p></div>  : null}
          </div>
      )}

      />

  )
}

const SignInPage = () => {
  const navigate = useNavigate();
  const methods = useForm<IForm>();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = methods;

  const ajaxPostSignIn = (data: IForm) => {
    axios
      .post(`${SERVER_HOST}/login`, data)
      .then(response => {
        // 헤더에 담긴 토큰 가져오기
        const accessToken = response.headers['authorization'];
        if (response.status === 200) {
          // token이 필요한 API 요청 시 header Authorization에 token 담아 전송
          axios.defaults.headers.common['authorization'] = `${accessToken}`;

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
          <FormProvider {...methods}>
          <Styled_Sign.Form onSubmit={handleSubmit(onSubmit)}>
            <div>
              {/* <Controller
                control={control}
                name={'title'}
                defaultValue={''}
                rules={{
                  required: '반드시 입력해야 합니다',
                }}
                render={({ field }) => {
                  return (
                    <Input
                      label={'공연명'}
                      height={30}
                      width={170}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  );
                }}
              /> */}
              <Input
              label={'이메일'}
              name={'email'}
              />
             <Input
             label={'비밀번호'}
             name={'password'}
             />

            </div>
            <ButtonPrimary160px>로그인하기</ButtonPrimary160px>
          </Styled_Sign.Form>
          </FormProvider>
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
