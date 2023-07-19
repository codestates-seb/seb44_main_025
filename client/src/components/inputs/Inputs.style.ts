import { styled, css } from 'styled-components';

const InputStyle = {
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

// Label, 메시지까지 포함한 컨테이너 div
export const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  & label {
    font-size: var(--p-small-medium-font-size);
    font-weight: var(--p-small-medium-font-weight);
    line-height: var(--p-small-medium-line-height);
    color: var(--button-white-background-color);
    margin-left: 15.5px;
  }
  & p {
    margin-left: 15.5px;
  }
`;

export type ThemeType = 'light' | 'dark' | 'warning' | 'success' | 'primary';
// Input 영역과 직접적으로 관련된 컨테이너 div
export type InputContainerType = {
  width?: 75 | 170 | 285 | 312 | 360;
  height?: 30 | 48;
  theme?: ThemeType;
};
export const InputContainer = styled.div<InputContainerType>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 100px;
  outline: none;
  width: ${props => (props.width ? `${props.width}px` : '360px')};
  height: ${props => (props.height ? `${props.height}px` : '48px')};

  & input {
    background-color: transparent;
    outline: none;
    border: none;
    margin-left: 8px;
    margin-right: 8px;
    width: 100%;
  }

  & > :first-child {
    margin-left: 12px;
  }
  & > input:first-child {
    margin-left: 15.5px;
  }
  ${({ theme }: { theme: ThemeType }) => InputStyle[theme]};
`;

// Input 컨테이너 옆에 검색 버튼이 있는 예외 처리를 위한 flex div
export type InputFlexContainerType = {
  height?: 30 | 48;
};

export const InputFlexContainer = styled.div<InputFlexContainerType>`
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: ${props => (props?.height ? `${props.height}px` : '48px')};
  max-width: 360px;

  & p,
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #8250ca;
    font-size: 16px;
    font-weight: Medium;
    line-height: 24px;
    margin-left: 12px;
    white-space: nowrap;
  }
`;

export const ParagraphErrorMessage = styled.p`
  font-size: var(--p-small-regular-font-size);
  font-weight: var(--p-small-regular-font-weight);
  line-height: var(--p-small-regular-line-height);
  margin-left: 15.5px;
  color: var(--button-highlight-background-color);
`;
export const ParagraphSuccessMessage = styled.p`
  font-size: var(--p-small-regular-font-size);
  font-weight: var(--p-small-regular-font-weight);
  line-height: var(--p-small-regular-line-height);
  margin-left: 15.5px;
  color: #4dcfc0;
`;
