import { styled } from 'styled-components';
const S = {
  Main: styled.main`
    display: flex;
    justify-content: center;
  `,
  Container: styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    width: 390px;
    background-color: var(--theme-background-color);
  `,
  P: styled.p`
    color: var(--font-white-color);
    font-size: var(--p-large-medium-font-size);
    font-weight: var(--p-large-medium-font-weight);
  `,
};
export default S;
