import { S } from './PerformanceList.style';
import { ReactComponent as MapIcon } from '../../icons/icon_map_search.svg';
import { Button } from '../../components/buttons/Buttons';
import { useNavigate } from 'react-router-dom';
import ConcertPreview from '../../components/concert-preview/ConcertPreview';
import Header from '../../components/header/Header';
import { useGetPerformances } from '../../api/useFetch';
import { categoryObj } from '../../utils/Category';
import Navbar from '../../components/nav/Navbar';
import { useState, useRef, useEffect } from 'react';
import { getCookie } from '../../utils/Cookie';
import { H1Title } from '../../theme/common/SlideUp';
import { useIntersectionObserver } from '../../utils/useIntersectionObservser';
import { throttle } from '../../utils/Throttle';

const PerformanceList = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const targetRef = useRef<HTMLDivElement>(null);

  // Note: InterSectionObserver 콜백 함수
  const handleIntersection = () => {
    setPage(page => page + 1);
  };
  // InterSectionObserver options
  const options = {
    root: null,
    threshold: 0,
  };
  // IntersectionObserver 반환하는 Hook
  const observer = useIntersectionObserver(
    throttle(handleIntersection, 500),
    options
  );
  const [isStale, setIsStale] = useState<boolean | null>(null);
  const handleClickCategory = (id: string) => {
    setPage(1);
    if (category === +id) {
      setCategory(null);
    } else {
      setCategory(+id);
    }
  };
  const [pageInfo, data] = useGetPerformances(category, isStale, page, size);
  useEffect(() => {
    if (targetRef.current) {
      if (page === 1) observer.current.observe(targetRef.current);
      if (page >= (pageInfo?.total_pages ?? Infinity))
        observer.current.unobserve(targetRef.current);
    }
  }, [data]);

  const isLoggedIn = getCookie('accessToken');
  return (
    <>
      <Header />
      <S.Container>
        <S.Main>
          <S.TitleButtonFlex>
            <H1Title.H1>
              <H1Title.H1span>공연정보</H1Title.H1span>
            </H1Title.H1>
            {/* TODO: 지도와 연계하기 
            <MapIcon
              onClick={() =>
                console.log('리스트에 있는 공연들을 지도에 보여주기')
              }
            />*/}
          </S.TitleButtonFlex>
          <S.CategoryContainer>
            <S.Tab>
              <S.Heading3
                onClick={() => {
                  setIsStale(null);
                  setPage(1);
                }}
              >
                전체
              </S.Heading3>
              <S.Heading3>|</S.Heading3>
              <S.Heading3
                onClick={() => {
                  setIsStale(false);
                  setPage(1);
                }}
              >
                진행중공연
              </S.Heading3>
              <S.Heading3>|</S.Heading3>
              <S.Heading3
                onClick={() => {
                  setIsStale(true);
                  setPage(1);
                }}
              >
                지난공연
              </S.Heading3>
            </S.Tab>
            {isLoggedIn && getCookie('userInfo')?.hasArtist && (
              <S.ButtonContainer>
                <Button
                  size="small"
                  theme="primary"
                  onClick={() => navigate('/performances/register')}
                >
                  공연 등록
                </Button>
              </S.ButtonContainer>
            )}
          </S.CategoryContainer>
          <S.CategoryContainer>
            {Object.keys(categoryObj).map((key, idx) => {
              return category && idx + 1 === +category ? (
                <Button
                  theme="highlight"
                  size="mini"
                  key={key}
                  value={key}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    const value = (e.target as HTMLInputElement).value;
                    handleClickCategory(value);
                  }}
                >
                  {categoryObj[key]}
                </Button>
              ) : (
                <Button
                  theme="theme"
                  size="mini"
                  key={key}
                  value={key}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    const value = (e.target as HTMLInputElement).value;
                    handleClickCategory(value);
                  }}
                >
                  {categoryObj[key]}
                </Button>
              );
            })}
          </S.CategoryContainer>
          <S.PerformanceContainer>
            {data?.map(performance => (
              <ConcertPreview
                key={performance.performanceId}
                {...performance}
              />
            ))}
          </S.PerformanceContainer>
          <div ref={targetRef} style={{ height: '5vh' }}></div>
        </S.Main>
      </S.Container>
      <Navbar />
    </>
  );
};

export default PerformanceList;
