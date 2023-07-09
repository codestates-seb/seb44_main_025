import S from './Sign.styled';
import HeaderOnlyP from '../../components/Header/HeaderOnlyP';
import { ButtonPrimary160px } from '../../components/Buttons/Buttons';
import axios from 'axios';
import PageMovement from '../../components/Sign/PageMovement';
import { SubmitHandler, useForm } from 'react-hook-form';
import { emailRegExp } from '../../utils/RegExp';

interface IForm {
  email: string;
  password: string;
  password_confirm: string;
  nickname: string;
}

const SignInPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IForm>();

  const signIn = (data: IForm) => {
    axios
      .post('/login', data)
      .then(response => {
        const { accessToken } = response.data;
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${accessToken}`;
      })
      .catch(error => {
        alert(`error: ${error}`);
      });
  };

  /** 입력한 값들을 react-hook-form의 SubmitHandler를 통해 객체(data)로 받는 함수 */
  const onSubmit: SubmitHandler<IForm> = data => {
    console.log(data);

    signIn(data);
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
              </div>
            </div>
            <ButtonPrimary160px>로그인하기</ButtonPrimary160px>
          </S.Form>
          <PageMovement
            infoText="아직 계정이 없으신가요?"
            pagelink="/signup'"
            linkedText="회원가입"
          />
        </S.Container>
      </S.Main>
    </>
  );
};

export default SignInPage;
