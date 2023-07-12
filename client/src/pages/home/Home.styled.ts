import { styled } from 'styled-components';

export const Styled_Home = {
  Main: styled.main`
    display: flex;
    justify-content: center;
  `,
  Container: styled.div`
    min-height: calc(100vh - 100px);
    height: 800px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    gap: 30px;
    align-items: center;
    width: 390px;
    background-color: var(--theme-background-color);
  `,
  MiddlePart: styled.div`
    width: 390px;
    height: 200px;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
  `,
  AllBtnsDiv: styled.div`
    display: flex;
    flex-flow: row;
    width: 359px;
    justify-content: space-between;
    & > div {
      display: flex;
      flex-flow: column;
      gap: 20px;
    }
  `,
};
