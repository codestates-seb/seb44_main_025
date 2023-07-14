import { css } from 'styled-components';

export const InputStyle = {
  dark: css`
    background-color: rgba(198, 193, 204, 0.2);
    & input {
      color: white;
    }
    & svg {
      stroke: white;

      &:last-child {
        margin-right: 16px;
      }
    }
  `,
  light: css`
    background-color: white;
    &:focus-within {
      outline: 1.5px solid #8520ca;
    }
    & svg {
      stroke: #1a1a1a;

      &:last-child {
        margin-right: 16px;
      }
    }
  `,
  warning: css`
    background-color: rgba(229, 43, 103, 0.05);
    border: 1.5px solid #e52b67;
    & input {
      color: white;
    }
  `,
  success: css`
    background-color: rgba(77, 207, 192, 0.05);
    border: 1.5px solid #4dcfc0;
    & input {
      color: white;
    }
    & svg {
      stroke: white;

      &:last-child {
        margin-right: 16px;
      }
    }
  `,
  primary: css`
    background-color: transparent;
    border: 2px solid var(--button-primary-background-color);
    & input {
      color: white;
    }
    & svg {
      stroke: white;

      &:last-child {
        margin-right: 16px;
      }
    }
  `,
};
