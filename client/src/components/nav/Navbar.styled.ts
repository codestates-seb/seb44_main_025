import { styled } from 'styled-components';
import { FontStyle } from '../../utils/Theme';

export const Styled_Navbar = {
  Div: styled.div`
    display: flex;
    justify-content: center;

    height: 50px;
    position: sticky;
    bottom: 0;
  `,
  Container: styled.div`
    width: 390px;
    height: 50px;
    background-color: var(--theme-background-color);
  `,
  Nav: styled.nav`
    width: 390px;
    height: 50px;
    background-color: var(--nav-color);
    padding: 0px 12px 0px 12px;
    border-radius: 25px 25px 0px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  Span: styled.span`
    color: var(--font-white-color);
    ${FontStyle.nav}
  `,
  GroupDiv: styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 80px;
    cursor: pointer;
  `,
};
