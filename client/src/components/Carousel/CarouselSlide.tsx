import { styled } from 'styled-components';
import { ButtonWithArrowLight } from '../Buttons/Buttons';

type OwnProps = {
  posterImg: string;
};
const CarouselSlide: React.FC<OwnProps> = ({ posterImg }) => {
  return (
    <S.Container>
      <S.ConcertpreviewWrapper>
        <S.ConcertImg src="우리사랑이대로.jpeg" />
        <S.ConcertDetail>
          <S.ConcertTitle>우리 사랑 이대로</S.ConcertTitle>
          <S.Concertcontent>규현&은지</S.Concertcontent>
          <S.Concertcontent>Pop</S.Concertcontent>
          <S.Concertcontent>₩ 10,000</S.Concertcontent>
          <S.Concertcontent>2023.08.03</S.Concertcontent>
          <ButtonWithArrowLight text={'공연예약'}></ButtonWithArrowLight>
        </S.ConcertDetail>
      </S.ConcertpreviewWrapper>

      <S.ImgDiv
        style={{ backgroundImage: `url(${posterImg})` }}
        // style={{ backgroundImage: 'url(/단체사진.jpg)' }}
      ></S.ImgDiv>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    /* float: left; */
  `,
  ImgDiv: styled.div`
    height: 180px;
    width: 390px;
    background-size: cover;
    background-position: center;
    filter: blur(5px);
    z-index: -1;
    position: relative;
  `,
  ConcertpreviewWrapper: styled.div`
    width: 390px;
    height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
  `,
  ConcertImg: styled.img`
    width: 200px;
    height: 150px;
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
