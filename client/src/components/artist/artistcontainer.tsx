import { styled } from "styled-components";
import Img from "../.././images/우리사랑이대로.jpeg";
import { FontStyle } from "../theme";
import DgText from "../Text";

export default function Artistmain() {
  return (
    <S.ArtistpreviewMain>
      <DgText
        type={"largeMedium"}
        style={{
          marginBottom: 20,
        }}
      >
        이번에 함께할 아티스트예요!
      </DgText>
      <S.ArtistpreviewContainer>
        <S.ArtistpreviewWrapper>
          <S.ArtistImg src={Img} />
          <S.ArtistDetail>
            <DgText type={"smallRegular"}>아티스트명</DgText>
          </S.ArtistDetail>
        </S.ArtistpreviewWrapper>
        <S.ArtistpreviewWrapper>
          <S.ArtistImg src={Img} />
          <S.ArtistDetail>
            <DgText type={"smallRegular"}>아티스트명</DgText>
          </S.ArtistDetail>
        </S.ArtistpreviewWrapper>
        <S.ArtistpreviewWrapper>
          <S.ArtistImg src={Img} />
          <S.ArtistDetail>
            <DgText type={"smallRegular"}>아티스트명</DgText>
          </S.ArtistDetail>
        </S.ArtistpreviewWrapper>
        <S.ArtistpreviewWrapper>
          <S.ArtistImg src={Img} />
          <S.ArtistDetail>
            <DgText type={"smallRegular"}>아티스트명</DgText>
          </S.ArtistDetail>
        </S.ArtistpreviewWrapper>
      </S.ArtistpreviewContainer>
    </S.ArtistpreviewMain>
  );
}

const S = {
  ArtistpreviewMain: styled.div`
    width: 360px;
    height: 160px;
  `,
  ArtistpreviewContainer: styled.div`
    width: 360px;
    height: 115px;
    display: flex;
    justify-content: space-evenly;
  `,
  ArtistpreviewWrapper: styled.div`
    width: 75px;
    height: 115px;
  `,
  ArtistImg: styled.img`
    width: 75px;
    height: 75px;
  `,
  ArtistDetail: styled.div`
    height: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
};
