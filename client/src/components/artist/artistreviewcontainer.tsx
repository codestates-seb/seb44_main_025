import { styled } from 'styled-components';
import Img from '../.././images/우리사랑이대로.jpeg';
import { ButtonPrimary75px } from '../Buttons/Buttons';

interface ArtistPreviewPropTypes {
  artistId?: number;
  imageUrl: string;
}

export default function ArtistreviewContainer(props: ArtistPreviewPropTypes) {
  return (
    <S.ArtistpreviewMain>
      <S.ArtistpreviewContainer>
        <S.ArtistpreviewWrapper>
          <S.ArtistImg src={props.imageUrl || Img} />
          <S.ArtistDetail>
            {/* 일치하는 공연 정보 페이지로 이동 */}
            <ButtonPrimary75px>공연정보</ButtonPrimary75px>
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
