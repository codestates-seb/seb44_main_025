import { styled } from 'styled-components';

export default function Concertpreview() {
  return (
    <S.ConcertpreviewWrapper>
      <S.ConcertImg src="우리사랑이대로.jpeg" />
      <S.ConcertDetail>
        <S.ConcertTitle>닉네임</S.ConcertTitle>
        <S.Concertcontent>content</S.Concertcontent>
        <S.Concertcontent>date</S.Concertcontent>
      </S.ConcertDetail>
    </S.ConcertpreviewWrapper>
  );
}

const S = {
  ConcertpreviewWrapper: styled.div`
    width: 360px;
    height: 60px;
    background-color: var(--font-mid-color);
    border-radius: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  `,
  ConcertImg: styled.img`
    width: 50px;
    height: 50px;
    margin: 15px;
    border: 3px solid transparent;
    border-radius: 50px;
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
    height: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  `,
  ConcertTitle: styled.header`
    font-size: var(--heading6-font-size);
    line-height: var(--heading6-line-height);
    font-weight: var(--heading6-font-weight);
    color: var(--font-white-color);
  `,
  Concertcontent: styled.p`
    font-size: var(--nav-font-size);
    font-weight: var(--nav-font-weight);
    line-height: var(--nav-line-height);
    color: var(--font-light-white-color);
  `,
};
