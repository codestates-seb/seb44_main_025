import { styled } from 'styled-components';
export const S = {
  Heading1: styled.h1`
    margin-top: 20px;
    margin-left: 15px;
    color: white;
    font-size: var(--heading1-font-size);
    font-weight: var(--heading1-font-weight);
    line-height: var(--heading1-line-height);
  `,
  TitleButtonFlex: styled.div`
    margin-top: 20px;
    width: 360px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > h1 {
      margin-left: 0;
    }
    & > svg {
      stroke: white;
      cursor: pointer;
    }
  `,
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1e1e1e;
  `,
  Main: styled.main`
    width: 390px;
    min-height: calc(100vh - 120px);
    background-color: var(--theme-background-color);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  `,
  CategoryContainer: styled.div`
    margin-top: 8px;
    display: flex;
    min-width: 360px;
    justify-content: space-between;
    align-items: center;
    & > button {
      min-width: 40px;
      padding: 0px 5px;
      width: fit-content;
    }
  `,
  ButtonContainer: styled.div`
    margin-left: 4px;
  `,
  PerformanceContainer: styled.div`
    width: 360px;
    & div {
      margin: 8px 0px;
    }
  `,
  Heading3: styled.h3`
    font-size: var(--heading3-font-size);
    font-weight: var(--heading3-font-weight);
    line-height: var(--heading3-line-height);
    color: white;
    cursor: pointer;

    &:not(:first-child, :last-child):nth-child(2n) {
      margin-left: 5px;
      margin-right: 5px;
      padding-bottom: 5px;
      cursor: auto;
    }
  `,
  Tab: styled.div`
    height: 24px;
    display: flex;
    align-items: center;
  `,
};
