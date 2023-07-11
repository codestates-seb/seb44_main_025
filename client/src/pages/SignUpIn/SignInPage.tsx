import S from './Sign.styled';
import HeaderOnlyP from '../../components/Header/HeaderOnlyP';
import { ButtonPrimary160px } from '../../components/Buttons/Buttons';
import axios from 'axios';
import PageMovement from '../../components/Sign/PageMovement';
import { SubmitHandler, useForm } from 'react-hook-form';
import { emailRegExp } from '../../utils/RegExp';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../utils/Cookie';

interface IForm {
  email: string;
  password: string;
  password_confirm: string;
  nickname: string;
}

const SignInPage = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IForm>();

  const ajaxPostSignIn = (data: IForm) => {
    axios
      .post('/login', data)
      .then(response => {
        const { accessToken } = response.data;
        if (response.status === 200) {
          // token이 필요한 API 요청 시 header Authorization에 token 담아 전송
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${accessToken}`;
          // cookie에 토큰 저장
          setCookie('token', `JWT ${response.data.token}`, {
            path: '/',
            sameSite: 'strict',
            secure: true,
            httpOnly: true,
          });
          // 메인페이지로 이동
          alert('[로그인 성공] 메인 페이지로 이동합니다');
          navigate('/');
        }
      })
      .catch(error => {
        alert(`error: ${error}`);
      });
  };

  /** 입력한 값들을 react-hook-form의 SubmitHandler를 통해 객체(data)로 받는 함수 */
  const onSubmit: SubmitHandler<IForm> = data => {
    ajaxPostSignIn(data);
  };

  return (
    <>
      <HeaderOnlyP />
      <S.Main>
        <S.Container>
          <S.H1 mb={145}>Ez to 로그인</S.H1>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
                <label htmlFor="email">이메일</label>
                <div>
                  <S.Input
                    width={360}
                    {...register('email', {
                      required: true,
                      pattern: emailRegExp,
                    })}
                  />
                </div>
                <div>
                  {errors.email && <p>이메일 형식에 맞게 입력해주세요</p>}
                </div>
              </div>
              <div>
                <label htmlFor="password">비밀번호</label>
                <S.Input
                  type="password"
                  {...register('password', {
                    required: true,
                  })}
                />
                <div>{errors.password && <p>반드시 입력해야 합니다</p>}</div>
              </div>
            </div>
            <ButtonPrimary160px>로그인하기</ButtonPrimary160px>
          </S.Form>
          <PageMovement
            infoText="아직 계정이 없으신가요?"
            pagelink="/signup'"
            linkedText="회원가입"
            mt={160}
          />
        </S.Container>
      </S.Main>
    </>
  );
};

export default SignInPage;
