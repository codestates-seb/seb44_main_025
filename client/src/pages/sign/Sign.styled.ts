import { styled } from 'styled-components';
import { FontStyle } from '../../utils/Theme';
import { DeviceQuery } from '../../utils/Media';
import { screenScale } from '../../utils/MediaSize';

export const Styled_Sign = {
  H1: styled.h1<{ marginBottom?: number }>`
    margin-bottom: ${props => props.marginBottom}px;
    margin-top: 20px;
    ${DeviceQuery.tablet`
      margin-top: calc(20px * ${screenScale.tablet});
    `}
  `,
  Main: styled.main`
    display: flex;
    justify-content: center;
  `,
  Container: styled.div`
    min-height: calc(100vh - 60px);
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    width: 390px;
    background-color: var(--theme-background-color);
    ${DeviceQuery.tablet`
      min-height: calc(100vh - (60px * ${screenScale.tablet}));
      width: calc(390px * ${screenScale.tablet})
    `}
  `,
  P: styled.p`
    color: var(--font-white-color);
    ${FontStyle.largeMedium}
  `,
  Input: styled.input<{ width?: 360 | 285 }>`
    border-radius: 100px;
    outline: none;
    width: ${props => (props.width ? `${props.width}px` : '360px')};
    height: 48px;
    color: black;
    ${FontStyle.largeMedium}
    padding-left: 15px;
    white-space: nowrap;
    &:focus {
      border: 1.5px solid #8520ca;
    }
    ${DeviceQuery.tablet`
      width: calc(285px * ${screenScale.tablet})
      height: calc(48px * ${screenScale.tablet})
    `}
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
    /* 이메일, 비밀번호, 비밀번호확인, 닉네임을 묶는 div */
    & > div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 8px;
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

    & label {
      color: var(--button-white-background-color);
      margin-left: 12px;
    }
    & p {
      color: var(--font-highlight-color);
      font-size: var(--nav-font-size);
      margin-left: 12px;
      margin-top: 5px;
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
