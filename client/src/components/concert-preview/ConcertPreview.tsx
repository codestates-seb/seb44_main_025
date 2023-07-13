import { styled } from 'styled-components';
import Img from '../.././images/우리사랑이대로.jpeg';
import { useNavigate } from 'react-router-dom';

interface ConcertPreviewPropTypes {
  posterImg?: string;
  title?: string;
  artistname?: string;
  category?: string;
  price?: number;
  date?: string;
  categoryId?: number;
  artistId?: number;
  place?: string;
  totalSeat?: number;
  imageUrl?: string;
  performanceId: string | number;
}

export default function Concertpreview(props: ConcertPreviewPropTypes) {
  const navigate = useNavigate();
  const date = new Date(props.date as string);
  return (
    <S.ConcertpreviewWrapper
      onClick={() => {
        navigate(`/performances/${props.performanceId}`);
      }}
    >
      <S.ConcertImg src={props.posterImg || Img} />
      <S.ConcertDetail>
        <S.ConcertTitle>{props.title || '타이틀'}</S.ConcertTitle>
        <S.Concertcontent>{props.artistname || '아티스트명'}</S.Concertcontent>
        <S.Concertcontent>{props.category || '기타'}</S.Concertcontent>
        <S.Concertcontent>{props.price || '가격'}원</S.Concertcontent>
        <S.Concertcontent>{date.toLocaleDateString()}</S.Concertcontent>
        {/* <S.Concertcontent>{date.toLocaleTimeString()}</S.Concertcontent> */}
        {/* <ButtonWithArrowDark text={'예약취소'}></ButtonWithArrowDark> */}
      </S.ConcertDetail>
    </S.ConcertpreviewWrapper>
  );
}

const S = {
  ConcertpreviewWrapper: styled.div`
    cursor: pointer;
    width: 360px;
    height: 180px;
    background-color: var(--font-mid-color);
    border-radius: 30px;
    display: flex;
    justify-content: space-between;
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
    margin-left: 15px;
  `,
  ConcertDetail: styled.section`
    margin-left: 10px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-end;
    margin-right: 15px;
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
