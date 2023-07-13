import { styled } from 'styled-components';
import { FontStyle } from '../../utils/Theme';

export const Styled_CarouselSlide = {
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
    ${FontStyle.heading6}
    color: var(--font-white-color);
  `,
  Concertcontent: styled.p`
    ${FontStyle.smallRegular}
    color: var(--font-light-white-color);
  `,
};
