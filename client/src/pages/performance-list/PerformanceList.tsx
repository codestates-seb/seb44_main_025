import { S } from './PerformanceList.style';
import { ReactComponent as MapIcon } from '../../icons/icon_map_search.svg';
import { Button } from '../../components/buttons/Buttons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ConcertPreview from '../../components/concert-preview/ConcertPreview';
import Header from '../../components/header/Header';
import { useGetPerformances } from '../../api/useFetch';
import { categoryObj } from '../../utils/Category';
import Navbar from '../../components/nav/Navbar';
import { useState } from 'react';
import { getCookie } from '../../utils/Cookie';
import { H1Title } from '../../theme/common/SlideUp';

const PerformanceList = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');
  const page = searchParams.get('page');
  const size = searchParams.get('size');
  const [isStale, setIsStale] = useState<boolean | null>(null);
  const handleClickCategory = (id: string) => {
    if (category === id) {
      setSearchParams('');
    } else {
      setSearchParams({
        category: id,
      });
    }
  };
  const data = useGetPerformances(category, isStale, page, size);
  const isLoggedIn = getCookie('accessToken');
  // TODO: 공연 일정 경과 여부 필터링 로직 추가하기
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
                }}
              >
                전체
              </S.Heading3>
              <S.Heading3>|</S.Heading3>
              <S.Heading3
                onClick={() => {
                  setIsStale(false);
                }}
              >
                진행중공연
              </S.Heading3>
              <S.Heading3>|</S.Heading3>
              <S.Heading3
                onClick={() => {
                  setIsStale(true);
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
            {data?.data?.map(performance => (
              <ConcertPreview
                key={performance.performanceId}
                {...performance}
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
