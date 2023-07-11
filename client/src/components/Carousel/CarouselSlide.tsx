import { styled } from "styled-components";
import { ButtonWithArrowLight } from "../Buttons/Buttons";
import { Link } from "react-router-dom";

type OwnProps = {
  posterImg: string;
  title: string;
  nickname: string;
  content: string;
  price: number;
  date: string;
  categoryId: number;
};
const CarouselSlide: React.FC<OwnProps> = ({
  posterImg,
  title,
  nickname,
  content,
  price,
  date,
  categoryId,
}) => {
  return (
    <>
      <S.Div>
        <S.ConcertpreviewWrapper>
          <S.ConcertImg src={posterImg} />
          <S.ConcertDetail>
            <S.ConcertTitle>{title}</S.ConcertTitle>
            <S.Concertcontent>{nickname}</S.Concertcontent>
            <S.Concertcontent>{content}</S.Concertcontent>
            <S.Concertcontent>₩ {price.toLocaleString()}</S.Concertcontent>
            <S.Concertcontent>{date}</S.Concertcontent>
            <Link
              to={`/performances/${categoryId}`}
              style={{ textDecorationLine: "none" }}
            >
              <ButtonWithArrowLight text={"공연예약"}></ButtonWithArrowLight>
            </Link>
          </S.ConcertDetail>
        </S.ConcertpreviewWrapper>

        <S.ImgDiv style={{ backgroundImage: `url(${posterImg})` }} />
      </S.Div>
    </>
  );
};

const S = {
  ImgDiv: styled.div`
    height: 180px;
    width: 390px;
    background-size: cover;
    background-position: center;
    filter: blur(5px);
    z-index: -1;
    position: relative;
  `,
  Div: styled.div`
    display: flex;
    justify-content: center;
  `,
  ConcertpreviewWrapper: styled.div`
    width: 330px;
    height: 180px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
  `,
  ConcertImg: styled.img`
    width: 130px;
    height: 150px;
    object-fit: cover;
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

export default CarouselSlide;
