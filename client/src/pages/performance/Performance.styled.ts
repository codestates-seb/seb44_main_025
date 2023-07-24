import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1e1e1e;
`;
export const Main = styled.main`
  width: 390px;
  min-height: calc(100vh - 120px);
  background-color: var(--theme-background-color);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: white;
  padding-bottom: 70px;
`;
