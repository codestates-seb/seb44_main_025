import * as S from './Styled_Inputs';
import { InputContainerType } from './Styled_Inputs';
import { ReactComponent as CloseIcon } from '../../icons/icon_close.svg';
import { ReactComponent as SearchIcon } from '../../icons/icon_search.svg';

type InputType = {
  theme?: 'light' | 'dark' | 'warning' | 'success';
  label?: string;
  prefix?: boolean;
  suffix?: boolean;
  value?: string;
  onChange?: (value: any) => void;
  onBlur?: (e: React.SyntheticEvent) => void;
  errorMessage?: string;
  successMessage?: string;
  setValue?: (e: string) => void;
  placeholder?: string;
  type?: string;
  buttonText?: string;
  onSubmit?: () => void;
} & InputContainerType;
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
            placeholder={props?.placeholder}
            value={props?.value}
            onChange={e => {
              if (props.onChange) {
                props?.onChange(e.target.value);
              }
            }}
            onBlur={e => {
              if (props?.onBlur) {
                props?.onBlur(e);
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
