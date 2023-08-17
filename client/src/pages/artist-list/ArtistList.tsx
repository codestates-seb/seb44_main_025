import * as S from './ArtistList.style';
import { Button } from '../../components/buttons/Buttons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ArtistPreview from '../../components/artistpreview/ArtistPreview';
import Header from '../../components/header/Header';
import Navbar from '../../components/nav/Navbar';
import { useGetArtists } from '../../api/useFetch';
import { getCookie } from '../../utils/Cookie';
import { categoryObj } from '../../utils/Category';
import { H1Title } from '../../theme/common/SlideUp';
import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '../../utils/useIntersectionObservser';
import { throttle } from '../../utils/Throttle';

const ArtistList = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const targetRef = useRef<HTMLDivElement>(null);
  const handleIntersection = () => {
    setPage(page => page + 1);
  };
  const options = {
    root: null,
    threshold: 0.5,
  };
  const observer = useIntersectionObserver(
    throttle(handleIntersection, 500),
    options
  );
  const handleClickCategory = (id: string) => {
    setPage(1);
    if (category === id) {
      setSearchParams('');
    } else {
      setSearchParams({ category: id });
    }
  };
  const [pageInfo, data] = useGetArtists(category, page, size);
  // page는 0으로 시작하여 처음에 무조건 1로 증가함 - data 한 번 가져온 후 중단 조건 비교
  useEffect(() => {
    if (targetRef.current) {
      if (page === 1) observer.current.observe(targetRef.current);
      if (pageInfo === undefined || page >= (pageInfo?.total_pages ?? Infinity))
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
              <H1Title.H1span>아티스트</H1Title.H1span>
            </H1Title.H1>
            {isLoggedIn && !getCookie('userInfo')?.hasArtist && (
              <Button
                size="medium"
                theme="primary"
                onClick={() => navigate('/artistregist')}
              >
                아티스트 등록하기
              </Button>
            )}
          </S.TitleButtonFlex>
          <S.CategoryContainer>
            {Object.keys(categoryObj)?.map((key, idx) => {
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
          <S.ArtistContainer>
            {data?.map(artist => (
              <ArtistPreview key={artist.artistId} {...artist} />
            ))}
          </S.ArtistContainer>
          <div ref={targetRef} style={{ height: '5vh' }}></div>
        </S.Main>
      </S.Container>
      <Navbar />
    </>
  );
};

export default ArtistList;
