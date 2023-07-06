import { styled } from 'styled-components';
import { ReactComponent as CloseIcon } from '../../icons/icon_close.svg';
import { ReactComponent as SearchIcon } from '../../icons/icon_search.svg';
import { useState } from 'react';

type DivPropTypes = {
  status?: 'success' | 'error';
};

// Label, 메시지까지 포함한 컨테이너 div
const Div = styled.div<DivPropTypes>`
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
    font-size: var(--p-small-regular-font-size);
    font-weight: var(--p-small-regular-font-weight);
    line-height: var(--p-small-regular-line-height);
    margin-left: 15.5px;
    color: ${props =>
      props.status === 'error'
        ? 'var(--button-highlight-background-color)'
        : '#4dcfc0'};
  }
`;

// Input 영역과 직접적으로 관련된 컨테이너 div
type InputContainerPropTypes = {
  width?: 75 | 170 | 312 | 360;
  height?: 30 | 48;
};
const InputContainer = styled.div<InputContainerPropTypes>`
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
`;
const InputContainerLight = styled(InputContainer)`
  background-color: white;
  &:focus-within {
    outline: 1.5px solid #8520ca;
  }
  & svg {
    stroke: #1a1a1a;
    margin-right: 16px;
  }
`;
const InputContainerDark = styled(InputContainer)`
  background-color: rgba(198, 193, 204, 0.2);
  & input {
    color: white;
  }
  & svg {
    stroke: white;
    margin-right: 16px;
  }
`;
const InputContainerWarning = styled(InputContainer)`
  background-color: rgba(229, 43, 103, 0.05);
  border: 1.5px solid #e52b67;
  & input {
    color: white;
  }
`;
const InputContainerSuccess = styled(InputContainer)`
  background-color: rgba(77, 207, 192, 0.05);
  border: 1.5px solid #4dcfc0;
  & input {
    color: white;
  }
`;

// Input 컨테이너 옆에 검색 버튼이 있는 예외 처리를 위한 flex div
type InputFlexContainerPropTypes = {
  height?: 30 | 48;
  width?: 285 | 312;
};
const InputFlexContainer = styled.div<InputFlexContainerPropTypes>`
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: ${props => (props?.height ? `${props.height}px` : '48px')};
  width: 360px;
  & div {
    width: ${props => (props?.width ? `${props.width}px` : '312px')};
  }
  & div > input {
    width: ${props => (props?.width ? `${props.width}px` : '100%')};
  }
  & p {
    cursor: pointer;
    color: #8250ca;
    font-size: 16px;
    font-weight: Medium;
    line-height: 24px;
    margin-left: auto;
    white-space: nowrap;
  }
`;

// light, dark 테마 구분
type Theme = {
  theme?: 'light' | 'dark';
};
type InputPropTypes = {
  label?: string;
  icon?: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
} & Theme &
  DivPropTypes &
  InputContainerPropTypes;
export const Input = (props: InputPropTypes) => {
  return (
    <Div status={props?.status}>
      {props?.label && <label>{props.label}</label>}
      {props?.theme === 'dark' ? (
        <InputContainerDark height={props?.height} width={props?.width}>
          <input
            value={props.value}
            onChange={e => props.setValue(e.target.value)}
          />
          {props?.icon &&
            (props.value ? (
              <CloseIcon onClick={() => props.setValue('')} />
            ) : (
              <SearchIcon />
            ))}
        </InputContainerDark>
      ) : (
        <InputContainerLight height={props?.height} width={props?.width}>
          <input
            value={props.value}
            onChange={e => props.setValue(e.target.value)}
          />
          {props?.icon &&
            (props.value ? (
              <CloseIcon onClick={() => props.setValue('')} />
            ) : (
              <SearchIcon />
            ))}
        </InputContainerLight>
      )}
    </Div>
  );
};

type InputWarningSuccessPropTypes = {
  label?: string;
  message?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
} & DivPropTypes &
  InputContainerPropTypes;
export const InputWarning = (props: InputWarningSuccessPropTypes) => {
  return (
    <Div status={'error'}>
      {props?.label && <label>{props.label}</label>}
      <InputContainerWarning>
        <input
          value={props.value}
          onChange={e => props.setValue(e.target.value)}
        />
      </InputContainerWarning>
      {props?.message && <p>{props.message}</p>}
    </Div>
  );
};
export const InputSuccess = (props: InputWarningSuccessPropTypes) => {
  return (
    <Div status={'success'}>
      {props?.label && <label>{props.label}</label>}
      <InputContainerSuccess>
        <input
          value={props.value}
          onChange={e => props.setValue(e.target.value)}
        />
      </InputContainerSuccess>
      {props?.message && <p>{props.message}</p>}
    </Div>
  );
};

type InputWithButtonPropTypes = {
  buttonText: string;
  icon?: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
} & Theme &
  DivPropTypes &
  InputFlexContainerPropTypes;
export const InputWithButton = (props: InputWithButtonPropTypes) => {
  return (
    <Div status={props?.status}>
      <InputFlexContainer width={props?.width}>
        {props?.theme === 'dark' ? (
          <>
            <InputContainerDark height={props?.height}>
              <input
                value={props.value}
                onChange={e => props.setValue(e.target.value)}
              />
              {props?.icon &&
                (props.value ? (
                  <CloseIcon onClick={() => props.setValue('')} />
                ) : (
                  <SearchIcon />
                ))}
            </InputContainerDark>
            <p>{props.buttonText}</p>
          </>
        ) : (
          <>
            <InputContainerLight height={props?.height}>
              <input
                value={props.value}
                onChange={e => props.setValue(e.target.value)}
              />
              {props?.icon &&
                (props.value ? (
                  <CloseIcon onClick={() => props.setValue('')} />
                ) : (
                  <SearchIcon />
                ))}
            </InputContainerLight>
            <p>{props.buttonText}</p>
          </>
        )}
      </InputFlexContainer>
    </Div>
  );
};

export const InputsPreview = () => {
  const [icon, setIcon] = useState(true);
  const [value, setValue] = useState('');
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '700px',
      }}
    >
      <button onClick={() => setIcon(!icon)}>아이콘 true/false 전환</button>
      <Input
        theme={'light'}
        height={30}
        width={75}
        label={'Label'}
        icon={icon}
        value={value}
        setValue={setValue}
      />
      <Input
        theme={'light'}
        height={30}
        width={170}
        label={'Label'}
        icon={icon}
        value={value}
        setValue={setValue}
      />
      <Input
        theme={'light'}
        height={30}
        label={'Label'}
        icon={icon}
        value={value}
        setValue={setValue}
      />
      <Input
        theme={'dark'}
        height={48}
        label={'Label'}
        icon={icon}
        value={value}
        setValue={setValue}
      />
      <InputWithButton
        icon={icon}
        buttonText={'검색'}
        theme={'light'}
        height={30}
        value={value}
        setValue={setValue}
      />
      <InputWithButton
        icon={icon}
        buttonText={'중복확인'}
        theme={'light'}
        height={30}
        width={285}
        value={value}
        setValue={setValue}
      />
      <InputWithButton
        icon={icon}
        buttonText={'검색'}
        theme={'light'}
        height={48}
        value={value}
        setValue={setValue}
      />
      <InputWithButton
        icon={icon}
        buttonText={'검색'}
        theme={'dark'}
        height={48}
        value={value}
        setValue={setValue}
      />
      <InputWarning
        label={'비밀번호확인'}
        message={'비밀번호가 일치하지 않습니다.'}
        value={value}
        setValue={setValue}
      />
      <InputSuccess
        label={'비밀번호확인'}
        message={'비밀번호가 일치합니다.'}
        value={value}
        setValue={setValue}
      />
    </div>
  );
};
