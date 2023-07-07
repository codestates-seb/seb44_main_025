import S from './Sign.styled';
import HeaderOnlyP from '../../components/Header/HeaderOnlyP';
import { Input } from '../../components/Inputs/Inputs';
import { ButtonPrimary160px } from '../../components/Buttons/Buttons';
import { useRef, useState } from 'react';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IForm {
  email: string;
  password: string;
  password_confirm: string;
}

const SignUpPage = () => {
  let [nickname, setNickname] = useState('');
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<IForm>();
  /** 비밀번호 현재값 (비밀번호 확인란에서 사용)*/
  const input_password = useRef<string | null>(null);
  input_password.current = watch('password');

  /** email, password 유효성 검사 정규식
   * @email :
   * [A-Za-z0-9] 영문 대소문자 또는 숫자로 시작,
   * ([-_.]?[A-Za-z0-9]) 두 번째 글자부터 영문, 숫자, -_.사용가능
   * * 숫자 또는 문자 0개 이상
   * @ 필수
   * . 필수
   * [A-Za-z]{2,3} 도메인 2 또는 3글자
   * @Password :
   * [A-Za-z0-9]{8,20} 영문 또는 숫자 8~20 글자
   */
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;

  /** 입력한 값들을 react-hook-form의 SubmitHandler를 통해 객체(data)로 받는 함수 */
  const onSubmit: SubmitHandler<IForm> = data => {
    /** data로 받은 객체와 nicname을 묶어 회원정보를 보관하는 새로운 객체 생성 */
    const userProfile = {
      ...data,
      nickname,
    };
    /** 회원정보를 서버로 전송하는 ajax */
    axios
      .post('/signup', userProfile)
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

  return (
    <>
      <HeaderOnlyP />
      <S.Main>
        <S.Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                {...register('email', {
                  required: true,
                  pattern: emailRegEx,
                })}
              />
              {errors.email && (
                <p style={{ color: 'white' }}>이메일 형식으로 입력해라</p>
              )}
            </div>
            <div>
              <input
                type="password"
                {...register('password', {
                  required: true,
                  pattern: passwordRegEx,
                })}
              />
              {errors.password && (
                <p style={{ color: 'white' }}>비밀번호 형식으로 입력해라</p>
              )}
            </div>
            <div>
              <input
                type="password"
                {...register('password_confirm', {
                  required: true,
                  validate: value => value === input_password.current,
                })}
              />
              {errors.password_confirm && (
                <p style={{ color: 'white' }}>똑같은 비밀번호 입력하셈</p>
              )}
            </div>
            <Input
              label="닉네임"
              width={360}
              height={48}
              value={nickname}
              setValue={setNickname}
            />
            <ButtonPrimary160px
              onClick={() => {
                onSubmit;
              }}
            >
              버튼
            </ButtonPrimary160px>
          </form>
          {/* <Input
            label="이메일로 회원가입하기"
            width={360}
            height={48}
            value={email}
            setValue={setEmail}
          />
          <Input label="비밀번호" width={360} height={48} />
          <Input
            label="비밀번호 확인"
            width={360}
            height={48}
            value={password}
            setValue={setPwassword}
          />
          <Input
            label="닉네임"
            width={360}
            height={48}
            value={nickname}
            setValue={setNickname}
          />
          <ButtonPrimary160px
            onClick={() => {
              registerFC();
            }}
          >
            회원가입하기
          </ButtonPrimary160px>
          <S.P>이미 계정이 있으신가요? </S.P>
          <S.P>로그인</S.P> */}
        </S.Container>
      </S.Main>
    </>
  );
};

export default SignUpPage;
