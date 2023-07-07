import { useState } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as ArrowIcon } from '../../icons/icon_right.svg';

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
export const ButtonWithArrowLight = ({ text }: { text: string }) => {
  const theme = 'light';
  return (
    <ButtonWithIcon theme={theme}>
      <p>{text}</p>
      <ArrowIcon stroke={'#8250ca'} />
    </ButtonWithIcon>
  );
};
export const ButtonWithArrowDark = ({ text }: { text: string }) => {
  const theme = 'dark';
  return (
    <ButtonWithIcon theme={theme}>
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

export const ButtonsPreview = () => {
  return (
    <>
      <ButtonMini>버튼</ButtonMini>
      <ButtonToggle text={'버튼'} />
      <ButtonPrimary75px>버튼</ButtonPrimary75px>
      <ButtonPrimary160px>버튼</ButtonPrimary160px>
      <ButtonPrimary335px>공연 정보 등록/수정</ButtonPrimary335px>
      <ButtonWithArrowLight text={'공연예약'} />
      <ButtonWithArrowDark text={'공연예약'} />
      <ButtonHighlightBorder>회원탈퇴</ButtonHighlightBorder>
      <ButtonHighlight>취소</ButtonHighlight>
      <ButtonWhite>결제</ButtonWhite>
    </>
  );
};
