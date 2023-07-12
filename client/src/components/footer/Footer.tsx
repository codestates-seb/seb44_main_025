import { styled } from 'styled-components';
import Img from '../../images/우리사랑이대로.jpeg';

export default function Footer() {
  return (
    <S.FooterContainer>
      <S.FooterLogo src={Img} />
      <S.FooterContentDiv>
        <S.FooterContent>허진우, 이도현, 최연동</S.FooterContent>
        <S.FooterContent>이현수, 선혜민, 조혜란</S.FooterContent>
        <S.FooterContent>gitbub 바로가기</S.FooterContent>
        <S.FooterContent>notion 바로가기</S.FooterContent>
      </S.FooterContentDiv>
    </S.FooterContainer>
  );
}

const S = {
  FooterContainer: styled.div`
    width: 390px;
    height: 150px;
    border-top: 2px solid var(--header-border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 15px 0px 15px;
  `,
  FooterLogo: styled.img`
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
  `,
  FooterContentDiv: styled.div``,

  FooterContent: styled.p`
    font-size: var(--heading6-font-size);
    line-height: var(--heading6-font-weight);
    font-weight: var(--heading6-line-height);
    color: var(--font-white-color);
    margin-bottom: 3px;
    display: flex;
    justify-content: flex-end;
  `,
};
