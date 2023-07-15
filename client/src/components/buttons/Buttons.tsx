import React, { useState } from 'react';
import { styled, css } from 'styled-components';
import { ButtonSizeStyle, ButtonThemeStyle } from './Buttons.style';
import { ReactComponent as ArrowIcon } from '../../icons/icon_right.svg';

type ButtonSize = 'mini' | 'small' | 'medium' | 'large';
type ButtonTheme =
  | 'white'
  | 'highlight'
  | 'highlightBorder'
  | 'primary'
  | 'theme';
interface ButtonProps {
  size?: 'mini' | 'small' | 'medium' | 'large';
  theme?: 'white' | 'highlight' | 'highlightBorder' | 'primary' | 'theme';
  border?: boolean;
  icon?: boolean;
  width?: number;
  height?: number;
  color?: string;
}

export const Button = styled.button<ButtonProps>`
  &[disabled] {
    pointer-events: none;
  }
  cursor: pointer;
  border-radius: 100px;
  ${({ size }) => (size ? ButtonSizeStyle[size] : ButtonSizeStyle.medium)};
  ${({ theme }: { theme: ButtonTheme }) =>
    theme ? ButtonThemeStyle[theme] : ButtonThemeStyle.primary};
  ${({ width }) => (width ? `width: ${width}px;` : '')};
  ${({ height }) => (height ? `height: ${height}px;` : '')};
  ${({ color }) => (color ? `color: ${color};` : '')};
  ${({ icon }) =>
    icon
      ? css`
          border: 1.5px solid var(--button-primary-background-color);
          & p {
            display: inline-block;
            position: relative;
            transition: 0.5s;
          }
          & p:after {
            content: ${icon ? '"➜"' : '"➜"'};
            position: relative;
            opacity: 1;
            top: 0;
            right: -6px;
            transition: 0.5s;
          }
          &:is(:hover, :active) {
            box-shadow: 0px 0px 3px var(--button-primary-border-color);
            & p {
              margin-right: -14px;
            }
            & p:after {
              opacity: 0;
              right: -20px;
            }
          }
        `
      : ''};
`;

interface ButtonWithArrowProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  theme: ButtonTheme;
}
export const ButtonWithArrow: React.FC<ButtonWithArrowProps> = props => (
  <Button
    size={'medium'}
    icon={true}
    width={120}
    height={24}
    {...props}
    theme={props.theme}
  >
    <p>{props.text}</p>
  </Button>
);

export const ButtonsPreview = () => {
  return (
    <>
      {/* 기존의 ButtonMini */}
      <Button size={'mini'} theme={'theme'}>
        미니
      </Button>
      {/* 버튼 Primary 75px, 160px, 335px */}
      <Button size={'small'} theme={'primary'}>
        버튼
      </Button>
      <Button size={'medium'} theme={'primary'}>
        버튼
      </Button>
      <Button size={'large'} theme={'primary'}>
        공연 정보 등록/수정
      </Button>
      <ButtonWithArrow text={'공연예약'} theme="white" />
      <Button theme="highlightBorder" size="small">
        회원탈퇴
      </Button>
      <Button theme={'highlight'} size={'small'} height={34}>
        취소
      </Button>
      <Button theme="white" size="small">
        결제
      </Button>
    </>
  );
};

export const ButtonMini = styled.button`
  cursor: pointer;
  width: 40px;
  height: 34px;
  background-color: var(--theme-background-color);
  border: 1.5px solid var(--button-primary-border-color);
  border-radius: 100px;
  color: var(--font-light-white-color);

  &:active {
    border: 1.5px solid var(--button-white-border-color);
    color: var(--button-white-border-color);
  }
`;

interface ButtonMiniTogglePropType {
  selected: boolean;
}
const ButtonMiniToggle = styled.button<ButtonMiniTogglePropType>`
  cursor: pointer;
  width: 40px;
  height: 34px;
  background-color: ${props =>
    props.selected
      ? 'var(--button-highlight-background-color)'
      : 'var(--theme-background-color)'};
  border: ${props =>
    props.selected ? 'none' : '1.5px solid var(--button-primary-border-color)'};
  border-radius: 100px;
  color: ${props =>
    props.selected
      ? 'var(--font-white-color)'
      : 'var(--font-light-white-color)'};
`;
export const ButtonMiniToggleSelect = styled.button`
  cursor: pointer;
  width: 40px;
  height: 34px;
  background-color: var(--button-highlight-background-color);
  border: none;
  border-radius: 100px;
  color: var(--font-white-color);
`;
export const ButtonMiniToggleUnselect = styled.button`
  cursor: pointer;
  width: 40px;
  height: 34px;
  background-color: var(--theme-background-color);
  border: 1.5px solid var(--button-primary-border-color);
  border-radius: 100px;
  color: var(--font-light-white-color);
`;

export const ButtonToggle = ({ text }: { text: string }) => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <ButtonMiniToggle
      selected={isSelected}
      onClick={() => setIsSelected(!isSelected)}
    >
      {text}
    </ButtonMiniToggle>
  );
};

export const ButtonPrimary75px = styled.button`
  cursor: pointer;
  width: 75px;
  height: 36px;
  background-color: var(--button-primary-background-color);
  color: var(--font-white-color);
  font-weight: Medium;
  font-size: 14px;
  line-height: 20px;
  border-radius: 100px;
  border: none;
`;
type ButtonPrimary160pxPropTypes = { width?: 160 | 170 };
export const ButtonPrimary160px = styled.button<ButtonPrimary160pxPropTypes>`
  cursor: pointer;
  width: ${props => (props?.width ? `${props.width}px` : '160px')};
  height: 48px;
  background-color: var(--button-primary-background-color);
  color: var(--font-white-color);
  font-weight: Medium;
  font-size: 14px;
  line-height: 20px;
  border-radius: 100px;
  border: none;
`;
export const ButtonPrimary335px = styled.button`
  cursor: pointer;
  width: 335px;
  height: 50px;
  background-color: var(--button-primary-background-color);
  color: var(--font-white-color);
  font-weight: Medium;
  font-size: 16px;
  line-height: 24px;
  border-radius: 100px;
  border: none;
`;

interface ButtonWithIconPropType {
  theme: 'light' | 'dark';
}
const ButtonWithIcon = styled.button<ButtonWithIconPropType>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 120px;
  height: 24px;
  background-color: ${props =>
    props.theme === 'light'
      ? 'var(--button-white-background-color)'
      : 'var(--theme-background-color)'};
  color: ${props =>
    props.theme === 'light'
      ? 'var(--button-primary-background-color)'
      : 'var(--button-white-background-color)'};
  font-weight: Medium;
  font-size: 14px;
  line-height: 20px;
  border-radius: 100px;
  border: 1.5px solid var(--button-primary-background-color);

  & svg {
    margin-left: 8px;
  }
`;
export const ButtonWithArrowLight = ({
  text,
  onClick,
}: {
  text: string;
  onClick?: () => void;
}) => {
  const theme = 'light';
  return (
    <ButtonWithIcon theme={theme} onClick={onClick}>
      <p>{text}</p>
      <ArrowIcon stroke={'#8250ca'} />
    </ButtonWithIcon>
  );
};
export const ButtonWithArrowDark = ({
  text,
  onClick,
}: {
  text: string;
  onClick?: () => void;
}) => {
  const theme = 'dark';
  return (
    <ButtonWithIcon theme={theme} onClick={onClick}>
      <p>{text}</p>
      <ArrowIcon stroke={'#ffffff'} />
    </ButtonWithIcon>
  );
};
export const ButtonHighlightBorder = styled.button`
  cursor: pointer;
  width: 75px;
  height: 34px;
  border: 1px solid var(--button-highlight-border-color);
  background-color: rgba(130, 80, 202, 0.1);
  color: var(--button-highlight-border-color);
  font-weight: Medium;
  font-size: 14px;
  line-height: 20px;
  border-radius: 100px;
`;
export const ButtonHighlight = styled.button`
  cursor: pointer;
  width: 75px;
  height: 34px;
  background-color: var(--button-highlight-background-color);
  color: var(--button-white-border-color);
  font-weight: Medium;
  font-size: 14px;
  line-height: 20px;
  border-radius: 100px;
  border: none;
`;
export const ButtonWhite = styled.button`
  cursor: pointer;
  width: 75px;
  height: 34px;
  background-color: var(--button-white-background-color);
  color: var(--button-primary-border-color);
  font-weight: Medium;
  font-size: 14px;
  line-height: 20px;
  border-radius: 100px;
  border: none;
`;
