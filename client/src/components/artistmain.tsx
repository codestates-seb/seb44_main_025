import { styled } from 'styled-components';

export default function Artistmain() {
  return (
    <S.ArtistpreviewMain>
      <S.Subtitle>Ez to Play에서 활동중인 아티스트예요!</S.Subtitle>
      <S.veiwAll>전체보기</S.veiwAll>
      <S.ArtistpreviewContainer>
        <S.ArtistpreviewWrapper>
          <S.ArtistImg src="우리사랑이대로.jpeg" />
          <S.ArtistDetail>
            <S.Artistcontent>아티스트명</S.Artistcontent>
            <S.Artistcontent>장르</S.Artistcontent>
          </S.ArtistDetail>
        </S.ArtistpreviewWrapper>
        <S.ArtistpreviewWrapper>
          <S.ArtistImg src="우리사랑이대로.jpeg" />
          <S.ArtistDetail>
            <S.Artistcontent>아티스트명</S.Artistcontent>
            <S.Artistcontent>장르</S.Artistcontent>
          </S.ArtistDetail>
        </S.ArtistpreviewWrapper>
        <S.ArtistpreviewWrapper>
          <S.ArtistImg src="우리사랑이대로.jpeg" />
          <S.ArtistDetail>
            <S.Artistcontent>아티스트명</S.Artistcontent>
            <S.Artistcontent>장르</S.Artistcontent>
          </S.ArtistDetail>
        </S.ArtistpreviewWrapper>
        <S.ArtistpreviewWrapper>
          <S.ArtistImg src="우리사랑이대로.jpeg" />
          <S.ArtistDetail>
            <S.Artistcontent>아티스트명</S.Artistcontent>
            <S.Artistcontent>장르</S.Artistcontent>
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
  Subtitle: styled.header`
    font-size: var(--p-large-medium-font-size);
    font-weight: var(--p-large-medium-font-weight);
    line-height: var(--p-large-medium-line-height);
    color: var(--font-light-white-color);
  `,
  veiwAll: styled.p`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 10px;
    font-size: var(--p-small-medium-font-size);
    font-weight: var(--p-small-medium-font-weight);
    line-height: var(--p-small-medium-line-height);
    color: var(--button-primary-background-color);
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
  Artistcontent: styled.p`
    font-size: var(--p-small-regular-font-size);
    font-weight: var(--p-small-regular-font-weight);
    line-height: var(--p-small-regular-line-height);
    color: var(--font-light-white-color);
  `,
};
