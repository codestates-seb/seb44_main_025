import { styled } from 'styled-components';
import { FontStyle } from '../../utils/Theme';
import { ReactComponent as FooterIcon } from '../../icons/EZ to play_8.svg';

export default function Footer() {
  return (
    <S.FooterContainer>
      <S.LogoDiv>
        <FooterIcon height={100} />
      </S.LogoDiv>
      <S.FooterContentDiv>
        <S.FooterContent>허진우, 이도현, 최연동</S.FooterContent>
        <S.FooterContent>이현수, 선혜민, 조혜란</S.FooterContent>
        <S.FooterLink
          href={'https://github.com/codestates-seb/seb44_main_025'}
          target="_blank"
        >
          gitbub 바로가기
        </S.FooterLink>
        <S.FooterLink
          href={
            'https://www.notion.so/codestates/E-5-3b6d29f174e04d838a23fdb3a95d549a'
          }
          target="_blank"
        >
          notion 바로가기
        </S.FooterLink>
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
  LogoDiv: styled.div`
    display: flex;
    align-items: center;
    & svg {
      margin-left: -45px;
    }
  `,
  FooterContentDiv: styled.div``,
  FooterContent: styled.p`
    ${FontStyle.heading6}
    color: var(--font-white-color);
    margin-bottom: 3px;
    display: flex;
    justify-content: flex-end;
  `,
  FooterLink: styled.a`
    ${FontStyle.smallMedium};
    color: var(--font-primary--color);
    margin-bottom: 3px;
    display: flex;
    justify-content: flex-end;
    text-decoration: none;
  `,
};
