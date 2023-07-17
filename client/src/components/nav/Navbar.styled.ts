import { styled } from 'styled-components';
import { FontStyle } from '../../utils/Theme';

export const Styled_Navbar = {
  Div: styled.div`
    display: flex;
    justify-content: center;

    height: 60px;
    position: sticky;
    bottom: 0;
  `,
  Container: styled.div`
    width: 390px;
    height: 60px;
    background-color: var(--theme-background-color);
  `,
  Nav: styled.nav`
    width: 390px;
    height: 60px;
    background-color: var(--nav-color);
    padding: 0px 12px 0px 12px;
    border-radius: 25px 25px 0px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  TextSpan: styled.span`
    color: var(--font-white-color);
    ${FontStyle.nav}
  `,
  IconAndTextDiv: styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 90px;
    cursor: pointer;
  `,
<<<<<<< HEAD
=======
  // 호버시 하단 가로선 애니메이션
>>>>>>> dev
  AnimationDiv: styled.div`
    display: block;
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: none;
    position: relative;
    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      height: 1px;
      width: 0;
    }
    &:hover {
      &:before {
<<<<<<< HEAD
        width: 97.8%;
=======
        width: 100%;
>>>>>>> dev
        background: white;
        transition: 0.4s ease;
        bottom: -5px;
      }
      &:after {
<<<<<<< HEAD
        width: 97.8%;
=======
        width: 100%;
>>>>>>> dev
        background: 0 0;
        transition: all 0s ease;
      }
    }
  `,
};
