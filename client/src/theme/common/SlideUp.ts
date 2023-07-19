import { styled, keyframes } from 'styled-components';
import { FontStyle } from '../../utils/Theme';

/** 슬라이드 업 되는 H1 태그 애니메이션 */
const slideUp = keyframes`
0% {transform: translateY(100%);}
100% {transform: translateY(0px);}
`;

export const H1Title = {
  H1: styled.h1`
    color: var(--font-white-color);
    ${FontStyle.heading1}
    overflow: hidden;
  `,
  H1span: styled.span`
    animation: ${slideUp} 1s ease;
    display: block;
  `,
};
