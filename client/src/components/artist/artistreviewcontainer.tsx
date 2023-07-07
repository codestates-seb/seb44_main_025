import { styled } from 'styled-components';
import Img from '../.././images/우리사랑이대로.jpeg';

export default function ArtistreviewContainer() {
  return (
    <S.ArtistpreviewMain>
      <S.ArtistpreviewContainer>
        <S.ArtistpreviewWrapper>
          <S.ArtistImg src={Img} />
          <S.ArtistDetail>
            <S.Artistcontent>아티스트명</S.Artistcontent>
            <S.Artistreview>후기등록</S.Artistreview>
          </S.ArtistDetail>
        </S.ArtistpreviewWrapper>
        <S.ArtistpreviewWrapper>
          <S.ArtistImg src={Img} />
          <S.ArtistDetail>
            <S.Artistcontent>아티스트명</S.Artistcontent>
            <S.Artistreview>후기등록</S.Artistreview>
          </S.ArtistDetail>
        </S.ArtistpreviewWrapper>
        <S.ArtistpreviewWrapper>
          <S.ArtistImg src={Img} />
          <S.ArtistDetail>
            <S.Artistcontent>아티스트명</S.Artistcontent>
            <S.Artistreview>후기등록</S.Artistreview>
          </S.ArtistDetail>
        </S.ArtistpreviewWrapper>
        <S.ArtistpreviewWrapper>
          <S.ArtistImg src={Img} />
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
    height: 115px;
    margin-bottom: 10px;
  `,
  Subtitle: styled.header`
    font-size: var(--heading5-font-size);
    font-weight: var(--heading5-font-weight);
    line-height: var(--heading5-line-height);
    color: var(--font-white-color);
    padding: 10px 15px 10px 15px;
  `,
  ArtistpreviewContainer: styled.div`
    width: 360px;
    height: 115px;
    display: flex;
    justify-content: space-evenly;
    margin-left: 15px;
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
