import { styled } from 'styled-components';

export default function Artistcontainer() {
  return (
    <S.ArtistpreviewContainer>
      <S.ArtistpreviewWrapper>
        <S.ArtistImg src="우리사랑이대로.jpeg" />
        <S.ArtistDetail>
          <S.Artistcontent>아티스트명</S.Artistcontent>
        </S.ArtistDetail>
      </S.ArtistpreviewWrapper>
      <S.ArtistpreviewWrapper>
        <S.ArtistImg src="우리사랑이대로.jpeg" />
        <S.ArtistDetail>
          <S.Artistcontent>아티스트명</S.Artistcontent>
        </S.ArtistDetail>
      </S.ArtistpreviewWrapper>
      <S.ArtistpreviewWrapper>
        <S.ArtistImg src="우리사랑이대로.jpeg" />
        <S.ArtistDetail>
          <S.Artistcontent>아티스트명</S.Artistcontent>
        </S.ArtistDetail>
      </S.ArtistpreviewWrapper>
      <S.ArtistpreviewWrapper>
        <S.ArtistImg src="우리사랑이대로.jpeg" />
        <S.ArtistDetail>
          <S.Artistcontent>아티스트명</S.Artistcontent>
        </S.ArtistDetail>
      </S.ArtistpreviewWrapper>
    </S.ArtistpreviewContainer>
  );
}

const S = {
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
