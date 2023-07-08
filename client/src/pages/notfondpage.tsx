import { styled } from 'styled-components';

export default function Notfoundpage() {
  return (
    <>
      <S.Main>
        <S.Section>
          <S.Title>페이지를 찾을 수 없습니다.</S.Title>
        </S.Section>
      </S.Main>
    </>
  );
}

const S = {
  Main: styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  Section: styled.section`
    width: 390px;
    height: 100vh;
    background-color: var(--theme-background-color);
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Title: styled.header`
    font-size: var(--heading1-font-size);
    font-weight: var(--heading1-font-weight);
    line-height: var(--heading1-line-height);
    color: var(--font-white-color);
    padding: 20px 15px 10px 15px;
  `,
};
