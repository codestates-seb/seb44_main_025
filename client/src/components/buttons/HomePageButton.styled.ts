import { styled } from 'styled-components';

interface StyleDivProps {
  height: 140 | 60;
  imageurl: string;
}

export const Styled_HomePageButton = {
  Container: styled.button<StyleDivProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 170px;
    height: ${props => props.height}px;
    border-radius: 15px;
    border: 1px solid var(--theme-background-color);
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
      url(${props => props.imageurl});
    background-size: cover;
    background-position: center;
    color: var(--font-white-color);
    font-size: var(--heading6-font-size);
    font-weight: var(--p-small-medium-font-weight);
    cursor: pointer;
    &:hover {
      background-image: url(${props => props.imageurl});
      filter: brightness(130%);
      text-shadow: 3px 1px 10px black;
    }
    &:focus {
      border: 1px solid var(--header-border-color);
    }
  `,
};
