import * as S from './Styled_Inputs';
import { InputContainerType } from './Styled_Inputs';
import { ReactComponent as CloseIcon } from '../../icons/icon_close.svg';
import { ReactComponent as SearchIcon } from '../../icons/icon_search.svg';
import React from 'react';

type InputType = {
  theme?: 'light' | 'dark' | 'warning' | 'success';
  label?: string;
  prefix?: boolean;
  suffix?: boolean;
  onChange?: (value: any) => void;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  // setValue 사용하지 않게 되면 삭제하기
  onBlur?: (e: React.SyntheticEvent) => void;
  errorMessage?: string;
  successMessage?: string;
  buttonText?: string;
} & InputContainerType &
  React.InputHTMLAttributes<HTMLInputElement>;
export const Input = (props: InputType) => {
  return (
    <S.Div>
      {props?.label && <label>{props.label}</label>}
      <S.InputFlexContainer>
        <S.InputContainer
          theme={props?.theme || 'light'}
          height={props?.height}
          width={props?.width}
        >
          {props?.prefix && <SearchIcon />}
          <input
            type={props?.type}
            name={props?.name}
            value={props?.value}
            disabled={props?.disabled}
            max={props?.max}
            maxLength={props?.maxLength}
            min={props?.min}
            minLength={props?.minLength}
            readOnly={props?.readOnly}
            src={props?.src}
            onChange={e => {
              if (props.setValue) {
                props?.setValue(e.target.value);
              }
              if (props.onChange) {
                props?.onChange(e.target.value);
              }
            }}
          />
          {props?.suffix &&
            (props?.value ? (
              <CloseIcon
                onClick={() =>
                  typeof props?.onChange === 'function' && props?.onChange('')
                }
              />
            ) : (
              <SearchIcon />
            ))}
        </S.InputContainer>
        {props.buttonText && <button>{props.buttonText}</button>}
      </S.InputFlexContainer>
      {props?.errorMessage && (
        <S.ParagraphErrorMessage>{props?.errorMessage}</S.ParagraphErrorMessage>
      )}
      {props?.successMessage && (
        <S.ParagraphSuccessMessage>
          {props?.successMessage}
        </S.ParagraphSuccessMessage>
      )}
    </S.Div>
  );
};
