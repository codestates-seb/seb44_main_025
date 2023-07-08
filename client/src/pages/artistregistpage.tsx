import { styled } from 'styled-components';
import HeaderOnlyP from '../components/Header/HeaderOnlyP';
import { ButtonPrimary75px } from '../components/Buttons/Buttons';
import { Input, InputWithButton } from '../components/Inputs/Inputs';
import { useState } from 'react';
import Img from '.././images/우리사랑이대로.jpeg';

export default function Artistregist() {
  const [Artist, SetArtist] = useState('');
  const [Video, SetVideo] = useState('');

  return (
    <>
      <HeaderOnlyP />
      <S.Main>
        <S.Section>
          <S.Title>아티스트 등록하기</S.Title>
          <S.ProfileImg src={Img} />
          <S.UserImg src={Img} />
          <S.ArtistDetail>
            <S.SubTitle>아티스트 정보</S.SubTitle>
            <S.ButtonWarppar>
              <ButtonPrimary75px>등록</ButtonPrimary75px>
            </S.ButtonWarppar>
            <S.InputContainer>
              <S.InputLabel>아티스트</S.InputLabel>
              <InputWithButton
                value={Artist}
                icon={true}
                width={285}
                height={30}
                buttonText={'중복확인'}
              ></InputWithButton>
            </S.InputContainer>
            <S.InputContainer>
              <S.InputLabel>SNS Link</S.InputLabel>
              <Input height={30}></Input>
            </S.InputContainer>
            <S.InputContainer>
              <S.ArtistIntrodution>
                <S.InputLabel>아티스트 소개</S.InputLabel>
                <S.ArtistIntrodutionTextarea />
              </S.ArtistIntrodution>
            </S.InputContainer>
            <S.InputContainer>
              <S.InputLabel>동영상 첨부</S.InputLabel>
              <InputWithButton
                value={Video}
                icon={true}
                width={285}
                height={30}
                buttonText={'찾아보기'}
              ></InputWithButton>
            </S.InputContainer>
          </S.ArtistDetail>
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
  ArtistDetail: styled.div`
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
  ArtistIntrodution: styled.div`
    margin-top: 20px;
  `,
  ArtistIntrodutionTextarea: styled.textarea`
    width: 360px;
    height: 100px;
    resize: none;
    border-radius: 15px;
  `,
};
