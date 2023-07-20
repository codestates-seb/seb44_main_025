import S from './EditMyPage.style';
import Header from '../../components/header/Header';
import {
  ButtonPrimary75px,
  ButtonHighlightBorder,
} from '../../components/buttons/Buttons';
import { Input } from '../../components/inputs/Inputs';
import { useState } from 'react';
import Img from '../.././images/우리사랑이대로.jpeg';
import { Link } from 'react-router-dom';
import { H1Title } from '../../theme/common/SlideUp';

export default function Editmypage() {
  const [Artist, SetArtist] = useState('');

  return (
    <>
      <Header precious={true} />
      <S.Main>
        <S.Section>
          <S.Title>
            <H1Title.H1span>개인정보 수정하기</H1Title.H1span>
          </S.Title>
          <S.ProfileImg src={Img} />
          <S.UserImg src={Img} />
          <S.UserDetail>
            <S.SubTitle>로그인 아이디</S.SubTitle>
            <S.ButtonWarppar>
              <ButtonPrimary75px>수정</ButtonPrimary75px>
            </S.ButtonWarppar>
            <S.InputContainer>
              <S.InputLabel>닉네임</S.InputLabel>
              <Input
                value={Artist}
                suffix={true}
                width={285}
                buttonText={'중복확인'}
              />
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
              <Input
                theme={'success'}
                successMessage={'비밀번호가 일치합니다.'}
              />
            </S.InputContainer>
            <S.InputContainer>
              <S.InputLabel>비밀번호 변경 확인</S.InputLabel>
              <Input
                theme={'warning'}
                errorMessage={'비밀번호가 일치하지 않습니다.'}
              />
            </S.InputContainer>
            <S.HighlightButtonWarppar>
              <Link to="/cancel">
                <ButtonHighlightBorder>회원탈퇴</ButtonHighlightBorder>
              </Link>
            </S.HighlightButtonWarppar>
          </S.UserDetail>
        </S.Section>
      </S.Main>
    </>
  );
}
