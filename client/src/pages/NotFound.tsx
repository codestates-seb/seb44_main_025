import { styled } from 'styled-components';
import Header from '../components/header/Header';
import { DeviceQuery } from '../utils/Media';
import { screenScale } from '../utils/MediaSize';

interface NotfoundpageProps {
  message: string;
}

export default function Notfoundpage({ message }: NotfoundpageProps) {
  return (
    <>
      <Header precious={true} />
      <S.Main>
        <S.Section>
          <S.Title>{message}</S.Title>
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
    ${DeviceQuery.tablet`
      width: calc(390px * ${screenScale.tablet});
  `}
  `,
  Title: styled.header`
    font-size: var(--heading1-font-size);
    font-weight: var(--heading1-font-weight);
    line-height: var(--heading1-line-height);
    color: var(--font-white-color);
    padding: 20px 15px 10px 15px;
  `,
};
