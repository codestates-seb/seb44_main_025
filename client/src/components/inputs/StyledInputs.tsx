import { styled } from 'styled-components';

type InputPropTypes = {
  width?: 75 | 170 | 312 | 360;
  height?: 30 | 48;
  theme?: 'light' | 'dark';
};

export const Input = styled.input<InputPropTypes>`
  color: black;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 100px;
  outline: none;
  font-size: 16px;
  font-weight: Medium;
  line-height: 24px;
  padding-left: 12px;
  white-space: nowrap;
  width: ${props => (props.width ? `${props.width}px` : '360px')};
  height: ${props => (props.height ? `${props.height}px` : '48px')};
  background-color: ${props =>
    props.theme === 'dark' ? 'rgba(198, 193, 204, 0.2)' : 'white'};
  & > :first-child {
    margin-left: 12px;
  }
  & > input:first-child {
    margin-left: 15.5px;
  }
`;
