import { styled } from 'styled-components';

interface SignProps {
  width?: 360 | 285;
  mb?: number;
}
const S = {
  H1: styled.h1<SignProps>`
    color: var(--font-white-color);
    font-size: var(--heading1-font-size);
    font-weight: var(--heading1-font-weight);
    margin-bottom: ${props => props.mb}px;
  `,
  Main: styled.main`
    display: flex;
    justify-content: center;
  `,
  Container: styled.div`
    min-height: calc(100vh - 50px);
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    width: 390px;
    background-color: var(--theme-background-color);
  `,
  P: styled.p`
    color: var(--font-white-color);
    font-size: var(--p-large-medium-font-size);
    font-weight: var(--p-large-medium-font-weight);
  `,
  Input: styled.input<SignProps>`
    border-radius: 100px;
    outline: none;
    width: ${props => (props.width ? `${props.width}px` : '360px')};
    height: 48px;
    color: black;
    font-size: 16px;
    font-weight: Medium;
    line-height: 24px;
    padding-left: 15px;
    white-space: nowrap;
    &:focus {
      border: 1.5px solid #8520ca;
    }
  `,
  IputNDuplicateCheck: styled.div`
    display: flex;
    flex-flow: row;
    justify-content: center;
  `,
  Form: styled.form`
    width: 360px;
    display: flex;
    flex-direction: column;
    & {
      gap: 30px;
      /* 이메일, 비밀번호, 비밀번호확인, 닉네임을 묶는 div */
      & > div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        /* 각각의 이메일, 비밀번호, 비밀번호확인, 닉네임 */
        & > div {
          height: 100px;
          width: 100%;
          /* 인풋과 중복확인을 묶는 div */
          & > div {
            width: 100%;
            display: flex;
            flex-flow: row;
            justify-content: space-between;
            align-items: center;
          }
        }
      }
    }
    & label {
      color: var(--button-white-background-color);
      margin-left: 12px;
    }
    & p {
      color: var(--button-highlight-border-color);
      font-size: var(--nav-font-size);
      margin-left: 12px;
    }
    & button {
      margin-left: auto;
    }
    & span {
      color: var(--font-primary--color);
    }
  `,
  ButtonSpan: styled.span`
    cursor: pointer;
    color: var(--font-primary--color);
  `,
};
export default S;
