import * as S from './Inputs.style';
import { InputContainerType } from './Inputs.style';
import { ReactComponent as CloseIcon } from '../../icons/icon_close.svg';
import { ReactComponent as SearchIcon } from '../../icons/icon_search.svg';
import React from 'react';

type InputType = {
  theme?: 'light' | 'dark' | 'warning' | 'success' | 'primary';
  height?: number;
  width?: number;
  label?: string;
  prefix?: boolean;
  suffix?: boolean;
  onChange?: (value: any) => void;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  // setValue 사용하지 않게 되면 삭제하기
  errorMessage?: string;
  successMessage?: string;
  buttonText?: string;
  onClick?: (value: any) => void;
} & InputContainerType &
  React.InputHTMLAttributes<HTMLInputElement>;
export const Input: React.FC<InputType> = ({
  height,
  width,
  theme,
  label,
  prefix,
  suffix,
  onChange,
  setValue,
  errorMessage,
  successMessage,
  buttonText,
  onClick,
  ...props
}) => {
  return (
    <S.Div>
      {label && <label>{label}</label>}
      <S.InputFlexContainer>
        <S.InputContainer
          theme={theme || 'light'}
          height={height}
          width={width}
        >
          {prefix && <SearchIcon />}
          <input
            {...props}
            onChange={e => {
              if (setValue) {
                setValue(e.target.value);
              }
              if (onChange) {
                onChange(e.target.value);
              }
            }}
          />
          {suffix &&
            (props?.value ? (
              <CloseIcon
                onClick={() => {
                  typeof onChange === 'function' && onChange('');
                  typeof setValue === 'function' && setValue('');
                }}
              />
            ) : (
              <SearchIcon />
            ))}
        </S.InputContainer>
        {buttonText && <button onClick={onClick}>{buttonText}</button>}
      </S.InputFlexContainer>
      {errorMessage && (
        <S.ParagraphErrorMessage>{errorMessage}</S.ParagraphErrorMessage>
      )}
      {successMessage && (
        <S.ParagraphSuccessMessage>{successMessage}</S.ParagraphSuccessMessage>
      )}
    </S.Div>
  );
};
