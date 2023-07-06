import { styled } from 'styled-components';
import { ButtonWithArrowDark } from '../Buttons/Buttons';

export default function Concertpreview() {
  return (
    <S.ConcertpreviewWrapper>
      <S.ConcertImg src="우리사랑이대로.jpeg" />
      <S.ConcertDetail>
        <S.ConcertTitle>우리 사랑 이대로</S.ConcertTitle>
        <S.Concertcontent>규현&은지</S.Concertcontent>
        <S.Concertcontent>Pop</S.Concertcontent>
        <S.Concertcontent>₩ 10,000</S.Concertcontent>
        <S.Concertcontent>2023.08.03</S.Concertcontent>
        <ButtonWithArrowDark text={'공연예약'}></ButtonWithArrowDark>
      </S.ConcertDetail>
    </S.ConcertpreviewWrapper>
  );
}

const S = {
  ConcertpreviewWrapper: styled.div`
    width: 360px;
    height: 180px;
    background-color: var(--font-mid-color);
    border-radius: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
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
