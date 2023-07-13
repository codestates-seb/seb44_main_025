import { S } from './PerformanceList.style';
import { ReactComponent as MapIcon } from '../../icons/icon_map_search.svg';
import {
  ButtonMini,
  ButtonPrimary75px,
} from '../../components/buttons/Buttons';
import { TabPerformance } from '../../components/tabs/Tabs';
import { useNavigate } from 'react-router-dom';
import ConcertPreview from '../../components/concert-preview/ConcertPreview';
import Header from '../../components/header/Header';
import { useTestGetPerformances } from '../../api/useFetch';
import { categoryObj } from '../../utils/Category';
import Navbar from '../../components/nav/Navbar';

// TODO: props로 렌더링하기
const PerformanceList = () => {
  const data = useTestGetPerformances();
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

            {Object.keys(categoryObj).map(key => (
              <ButtonMini key={key}>{categoryObj[key]}</ButtonMini>
            ))}
            <ButtonMini>기타</ButtonMini>
          </S.CategoryContainer>
          <S.PerformanceContainer>
            {data?.map(v => (
              <ConcertPreview
                key={v.id}
                {...v}
                date={v.date}
                performanceId={v.id}
                posterImg={''}
                artistname={''}
                category={categoryObj[v.categoryId]}
                categoryId={1}
              />
            ))}
          </S.PerformanceContainer>
        </S.Main>
      </S.Container>
      <Navbar />
    </>
  );
};

export default PerformanceList;
