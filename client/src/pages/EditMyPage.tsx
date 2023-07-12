import { styled } from 'styled-components';
import Header from '../components/header/Header';
import {
  ButtonPrimary75px,
  ButtonHighlightBorder,
} from '../components/buttons/Buttons';
import {
  Input,
  InputWithButton,
  InputSuccess,
  InputWarning,
} from '../components/inputs/Inputs';
import { useState } from 'react';
import Img from '.././images/우리사랑이대로.jpeg';
import { Link } from 'react-router-dom';

export default function Editmypage() {
  const [Artist, SetArtist] = useState('');

  return (
    <>
      <Header precious={true} />
      <S.Main>
        <S.Section>
          <S.Title>개인정보 수정하기</S.Title>
          <S.ProfileImg src={Img} />
          <S.UserImg src={Img} />
          <S.UserDetail>
            <S.SubTitle>로그인 아이디</S.SubTitle>
            <S.ButtonWarppar>
              <ButtonPrimary75px>수정</ButtonPrimary75px>
            </S.ButtonWarppar>
            <S.InputContainer>
              <S.InputLabel>닉네임</S.InputLabel>
              <InputWithButton
                value={Artist}
                icon={true}
                width={285}
                buttonText={'중복확인'}
              ></InputWithButton>
            </S.InputContainer>
            <S.InputContainer>
              <S.InputLabel>비밀번호 변경</S.InputLabel>
              <Input></Input>
            </S.InputContainer>
            <S.InputContainer>
              <S.InputLabel>비밀번호 변경 확인</S.InputLabel>
              <Input></Input>
            </S.InputContainer>
            <S.InputContainer>
              <S.InputLabel>비밀번호 변경 확인</S.InputLabel>
              <InputSuccess message={'비밀번호가 일치합니다.'}></InputSuccess>
            </S.InputContainer>
            <S.InputContainer>
              <S.InputLabel>비밀번호 변경 확인</S.InputLabel>
              <InputWarning
                message={'비밀번호가 일치하지 않습니다.'}
              ></InputWarning>
            </S.InputContainer>
            <S.HighlightButtonWarppar>
              <Link to="cancelpage">
                <ButtonHighlightBorder>회원탈퇴</ButtonHighlightBorder>
              </Link>
            </S.HighlightButtonWarppar>
          </S.UserDetail>
        </S.Section>
      </S.Main>
    </>
  );
}

const S = {
  Main: styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  Section: styled.section`
    width: 390px;
    min-height: calc(100vh - 50px);
    background-color: var(--theme-background-color);
  `,
  Title: styled.header`
    font-size: var(--heading1-font-size);
    font-weight: var(--heading1-font-weight);
    line-height: var(--heading1-line-height);
    color: var(--font-white-color);
    width: 390px;
    padding: 20px 15px 10px 15px;
  `,
  ButtonWarppar: styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 15px;
    margin-bottom: 10px;
    margin-top: -40px;
  `,
  ProfileImg: styled.img`
    width: 390px;
    height: 150px;
    padding: 0px 15px;
  `,
  UserImg: styled.img`
    position: relative;
    width: 100px;
    height: 100px;
    margin-top: -60px;
    margin-left: 145px;
    border: 3px solid transparent;
    display: flex;
    justify-content: center;
    border-radius: 50px;
    background-image: linear-gradient(#fff, #fff),
      linear-gradient(
        to top right,
        var(--image-border-bottom-color),
        var(--image-border-top-color)
      );
    background-origin: border-box;
    background-clip: content-box, border-box;
    z-index: 1;
  `,
  UserDetail: styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
  `,
  SubTitle: styled.header`
    font-size: var(--heading5-font-size);
    font-weight: var(--heading5-font-weight);
    line-height: var(--heading5-line-height);
    color: var(--font-white-color);
    padding: 10px 15px 10px 15px;
  `,
  InputContainer: styled.div`
    margin-left: 15px;
    margin-bottom: 5px;
  `,
  InputLabel: styled.div`
    font-size: var(--p-large-medium-font-size);
    font-weight: var(--p-large-medium-font-weight);
    line-height: var(--p-large-medium-line-height);
    color: var(--font-white-color);
    margin-bottom: 5px;
    margin-left: 20px;
  `,
  HighlightButtonWarppar: styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 15px;
    margin-top: 40px;
    margin-bottom: 20px;
  `,
};
