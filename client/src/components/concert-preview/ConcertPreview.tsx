import { styled } from 'styled-components';
import { ButtonWithArrowDark } from '../buttons/Buttons';
import Img from '../.././images/우리사랑이대로.jpeg';

interface ConcertPreviewPropTypes {
  posterImg: string;
  title: string;
  artistname: string;
  category: string;
  price: number;
  date: string;
  categoryId: number;
  artistId?: number;
  place?: string;
  totalSeat?: number;
  imageUrl?: string;
}

export default function Concertpreview(props: ConcertPreviewPropTypes) {
  return (
    <S.ConcertpreviewWrapper>
      <S.ConcertImg src={props.posterImg || Img} />
      <S.ConcertDetail>
        <S.ConcertTitle>{props.title || '타이틀'}</S.ConcertTitle>
        <S.Concertcontent>{props.artistname || '아티스트명'}</S.Concertcontent>
        <S.Concertcontent>{props.category || '장르'}</S.Concertcontent>
        <S.Concertcontent>{props.price || '가격'}</S.Concertcontent>
        <S.Concertcontent>{props.date || '날짜'}</S.Concertcontent>
        <ButtonWithArrowDark text={'예약취소'}></ButtonWithArrowDark>
      </S.ConcertDetail>
    </S.ConcertpreviewWrapper>
  );
}

const S = {
  ConcertpreviewWrapper: styled.div`
    width: 360px;
    height: 180px;
    background-color: var(--font-mid-color);
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    margin-left: 15px;
  `,
  ConcertImg: styled.img`
    width: 200px;
    height: 150px;
    border: 3px solid transparent;
    border-radius: 35%;
    background-image: linear-gradient(#fff, #fff),
      linear-gradient(
        to top right,
        var(--image-border-bottom-color),
        var(--image-border-top-color)
      );
    background-origin: border-box;
    background-clip: content-box, border-box;
  `,
  ConcertDetail: styled.div`
    margin-left: 10px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-end;
  `,
  ConcertTitle: styled.header`
    font-size: var(--heading6-font-size);
    line-height: var(--heading6-line-height);
    font-weight: var(--heading6-font-weight);
    color: var(--font-white-color);
  `,
  Concertcontent: styled.p`
    font-size: var(--p-small-regular-font-size);
    font-weight: var(--p-small-regular-font-weight);
    line-height: var(--p-small-regular-line-height);
    color: var(--font-light-white-color);
  `,
};
