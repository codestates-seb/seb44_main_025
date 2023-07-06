import { styled } from 'styled-components';

const S = {
  Body: styled.body`
    display: flex;
    justify-content: center;

    height: 50px;
    position: sticky;
    bottom: 0;
  `,
  Nav: styled.nav`
    width: 390px;
    height: 50px;
    background-color: var(--nav-color);
    padding: 0px 12px 0px 12px;
    border-radius: 25px 25px 0px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  Span: styled.span`
    color: var(--font-white-color);
    font-size: var(--nav-font-size);
    font-weight: var(--nav-font-weight);
    line-height: var(--nav-line-height);
  `,
  GroupDiv: styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 80px;
    cursor: pointer;
  `,
};

export default S;
