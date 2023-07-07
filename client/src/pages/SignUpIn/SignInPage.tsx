import S from './Sign.styled';
import HeaderOnlyP from '../../components/Header/HeaderOnlyP';
import { Input } from '../../components/Inputs/Inputs';
import { ButtonPrimary160px } from '../../components/Buttons/Buttons';
import axios from 'axios';
import { useEffect, useState } from 'react';

const SignInPage = () => {
  let [email, setEmail] = useState('');
  let [password, setPwassword] = useState('');

  const signIn = () => {
    const data = {
      email,
      password,
    };
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

  return (
    <>
      <HeaderOnlyP />
      <S.Main>
        <S.Container>
          <Input
            label="이메일 주소로 로그인"
            width={360}
            height={48}
            value={email}
            setValue={setEmail}
          />
          <Input
            label="비밀번호"
            width={360}
            height={48}
            value={password}
            setValue={setPwassword}
          />
          <ButtonPrimary160px
            onClick={() => {
              signIn();
            }}
          >
            로그인
          </ButtonPrimary160px>
          <S.P>계정이 없으신가요? </S.P>
          <S.P>회원가입</S.P>
        </S.Container>
      </S.Main>
    </>
  );
};

export default SignInPage;
