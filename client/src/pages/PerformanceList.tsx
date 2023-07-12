import { styled } from 'styled-components';
import { ReactComponent as MapIcon } from '../icons/icon_map_search.svg';
import {
  ButtonMini,
  ButtonToggle,
  ButtonPrimary75px,
} from '../components/buttons/Buttons';
import { TabPerformance } from '../components/tabs/Tabs';
import Navbar from '../components/nav/Navbar';
import { useNavigate } from 'react-router-dom';
import ConcertPreview from '../components/concert-preview/ConcertPreview';
import Header from '../components/header/Header';

const S = {
  Heading1: styled.h1`
    margin-top: 20px;
    margin-left: 15px;
    color: white;
    font-size: var(--heading1-font-size);
    font-weight: var(--heading1-font-weight);
    line-height: var(--heading1-line-height);
  `,
  TitleButtonFlex: styled.div`
    width: 360px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > h1 {
      margin-left: 0;
    }
    & > svg {
      margin-top: 20px;
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
    min-height: calc(100vh - 100px);
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
    justify-content: flex-start;
    align-items: center;
    & > button:not(:first-child) {
      margin-left: 13px;
    }
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
};

// TODO: props로 렌더링하기
const PerformanceList = () => {
  const navigate = useNavigate();
  // TODO: 로그인 상태관리 로직 추가하기
  const isLoggedIn = true;
  // TODO: 공연 카테고리별 필터링 로직 추가하기
  // TODO: 공연 일정 경과 여부 필터링 로직 추가하기
  return (
    <>
      <Header />
      <S.Container>
        <S.Main>
          <S.TitleButtonFlex>
            <S.Heading1>공연 리스트</S.Heading1>
            {/* TODO: 지도와 연계하기 */}
            <MapIcon
              onClick={() =>
                console.log('리스트에 있는 공연들을 지도에 보여주기')
              }
            />
          </S.TitleButtonFlex>
          <S.CategoryContainer>
            <TabPerformance />
            {/* TODO: 공연 일정 이전 && 공연을 등록한 유저에게만 보여주기 */}
            <S.ButtonContainer>
              <ButtonPrimary75px
                onClick={() => navigate('/performances/register')}
              >
                공연 등록
              </ButtonPrimary75px>
            </S.ButtonContainer>
          </S.CategoryContainer>
          <S.CategoryContainer>
            {/* TODO: 클릭 시 카테고리별 검색 결과 출력하기 */}
            <ButtonMini>팝</ButtonMini>
            <ButtonMini>락</ButtonMini>
            <ButtonMini>R&B</ButtonMini>
            <ButtonMini>힙합</ButtonMini>
            <ButtonMini>재즈</ButtonMini>
            <ButtonMini>밴드</ButtonMini>
            <ButtonMini>댄스</ButtonMini>
          </S.CategoryContainer>
          <S.PerformanceContainer>
            <ConcertPreview />
            <ConcertPreview />
            <ConcertPreview />
            <ConcertPreview />
          </S.PerformanceContainer>
        </S.Main>
      </S.Container>
      <Navbar />
    </>
  );
};

export default PerformanceList;
