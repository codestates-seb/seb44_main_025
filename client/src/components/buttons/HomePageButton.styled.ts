import { styled } from 'styled-components';
import { FontStyle } from '../../utils/Theme';
import { DeviceQuery } from '../../utils/Media';
import { sizeChange } from '../../utils/MediaSize';

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
    ${FontStyle.heading6}
    cursor: pointer;
    &:hover {
      background-image: url(${props => props.imageurl});
      filter: brightness(130%);
      text-shadow: 3px 1px 10px black;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12),
        0 4px 4px rgba(0, 0, 0, 0.12), 0 8px 8px rgba(0, 0, 0, 0.12),
        0 16px 16px rgba(0, 0, 0, 0.12);
    }
    &:focus {
      border: 1px solid var(--header-border-color);
    }

    @media screen and (min-width: 820px) {
      width: calc(170px * ${sizeChange.tablet});
      height: calc(${props => props.height}px * ${sizeChange.tablet});
    }
  `,
};
