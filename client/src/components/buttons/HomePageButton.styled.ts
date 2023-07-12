import { styled } from 'styled-components';

interface StyleDivProps {
  height: 140 | 60;
  imageurl: string;
}

export const Styled_HomePageButton = {
  Container: styled.div<StyleDivProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 170px;
    height: ${props => props.height}px;
    border-radius: 15px;
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
      url(${props => props.imageurl});
    background-size: cover;
    background-position: center;
    cursor: pointer;
  `,
  Span: styled.span`
    color: var(--font-white-color);
  `,
};
