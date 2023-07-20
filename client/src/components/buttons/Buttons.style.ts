import { css } from 'styled-components';
import { FontStyle } from '../../utils/Theme';

export const ButtonSizeStyle = {
  mini: css`
    width: 40px;
    height: 34px;
    ${FontStyle.smallMedium}
  `,
  small: css`
    width: 75px;
    height: 36px;
    ${FontStyle.smallMedium}
  `,
  medium: css`
    width: 160px;
    height: 48px;
    ${FontStyle.smallMedium}
  `,
  large: css`
    width: 335px;
    height: 50px;
    ${FontStyle.largeMedium}
  `,
};

export const ButtonThemeStyle = {
  theme: css`
    background-color: var(--theme-background-color);
    border: 1.5px solid var(--button-primary-border-color);
    color: var(--font-white-color);
    transition: 0.2s;
    &:is(:active, :hover) {
      border: 1.5px solid var(--button-white-border-color);
      color: var(--button-white-border-color);
      transition: 0.2s;
    }
  `,
  highlightBorder: css`
    border: 1px solid var(--button-highlight-border-color);
    background-color: rgba(130, 80, 202, 0.1);
    color: var(--button-highlight-border-color);
    transition: 1s;
    &:hover {
      box-shadow: 0px 0px 7px var(--button-highlight-border-color);
      transition: 0.3s;
    }
    &:active {
      border-width: 1.5px;
      transition: 0s;
    }
  `,
  highlight: css`
    background-color: var(--button-highlight-background-color);
    color: var(--button-white-border-color);
    border: none;
    transition: 0.2s;
    &:hover {
      background-color: rgba(229, 43, 103, 0.8);
      color: rgba(255, 255, 255, 0.9)
      transition: 0.2s;
    }
    &:active {
      opacity: 0.8;
      transition: 0s;
    }`,
  white: css`
    background-color: var(--button-white-background-color);
    color: var(--button-primary-background-color);
    border: none;
    transition: 0.2s;
    &:hover {
      background-color: rgba(255, 255, 255, 0.8);
      transition: 0.2s;
    }
    &:active {
      opacity: 0.8;
      transition: 0s;
    }
  `,
  primary: css`
    background-color: var(--button-primary-background-color);
    color: var(--font-white-color);
    border: none;
    &:is(:active, :hover) {
      background-color: rgba(130, 80, 202, 0.8);
      transition: 0.2s;
    }
  `,
};
