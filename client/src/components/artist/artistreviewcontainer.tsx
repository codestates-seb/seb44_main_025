import { styled } from 'styled-components';
import Img from '../.././images/우리사랑이대로.jpeg';

interface ArtistPreviewPropTypes {
  artistId?: number;
  imageUrl?: string;
  content?: string;
}

export default function ArtistreviewContainer(props: ArtistPreviewPropTypes) {
  return (
    <S.ArtistpreviewMain>
      <S.ArtistpreviewContainer>
        <S.ArtistpreviewWrapper>
          <S.ArtistImg src={props.imageUrl} />
          <S.ArtistDetail>
            {/* 일치하는 공연 정보 페이지로 이동 */}
            <S.Artistbutton>{props.content}</S.Artistbutton>
            <S.Artistreview></S.Artistreview>
          </S.ArtistDetail>
        </S.ArtistpreviewWrapper>
      </S.ArtistpreviewContainer>
    </S.ArtistpreviewMain>
  );
}

const S = {
  ArtistpreviewMain: styled.div`
    height: 115px;
    margin-bottom: 10px;
  `,
  ArtistpreviewContainer: styled.div`
    height: 115px;
    margin-left: 15px;
  `,
  ArtistpreviewWrapper: styled.div`
    width: 75px;
    height: 115px;
  `,
  ArtistImg: styled.img`
    width: 75px;
    height: 75px;
    cursor: pointer;
  `,
  Artistbutton: styled.p`
    width: 75px;
    display: flex;
    justify-content: center;
    color: var(--font-primary--color);
    cursor: pointer;
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
