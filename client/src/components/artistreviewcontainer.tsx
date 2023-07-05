import { styled } from 'styled-components';

export default function ArtistreviewContainer() {
  return (
    <S.ArtistpreviewMain>
      <S.Subtitle>내가 관람한 공연</S.Subtitle>
      <S.ArtistpreviewContainer>
        <S.ArtistpreviewWrapper>
          <S.ArtistImg src="우리사랑이대로.jpeg" />
          <S.ArtistDetail>
            <S.Artistcontent>아티스트명</S.Artistcontent>
            <S.Artistreview>후기등록</S.Artistreview>
          </S.ArtistDetail>
        </S.ArtistpreviewWrapper>
        <S.ArtistpreviewWrapper>
          <S.ArtistImg src="우리사랑이대로.jpeg" />
          <S.ArtistDetail>
            <S.Artistcontent>아티스트명</S.Artistcontent>
            <S.Artistreview>후기등록</S.Artistreview>
          </S.ArtistDetail>
        </S.ArtistpreviewWrapper>
        <S.ArtistpreviewWrapper>
          <S.ArtistImg src="우리사랑이대로.jpeg" />
          <S.ArtistDetail>
            <S.Artistcontent>아티스트명</S.Artistcontent>
            <S.Artistreview>후기등록</S.Artistreview>
          </S.ArtistDetail>
        </S.ArtistpreviewWrapper>
        <S.ArtistpreviewWrapper>
          <S.ArtistImg src="우리사랑이대로.jpeg" />
          <S.ArtistDetail>
            <S.Artistcontent>아티스트명</S.Artistcontent>
            <S.Artistreview>후기등록</S.Artistreview>
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
    margin-bottom: 20px;
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
  Artistreview: styled.p`
    font-size: var(--p-small-regular-font-size);
    font-weight: var(--p-small-regular-font-weight);
    line-height: var(--p-small-regular-line-height);
    color: var(--font-primary--color);
  `,
};
