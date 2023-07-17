import * as S from './ArtistList.style';
import { Button } from '../../components/buttons/Buttons';
import { useNavigate } from 'react-router-dom';
import ArtistPreview from '../../components/artistpreview/ArtistPreview';
import Header from '../../components/header/Header';
import Navbar from '../../components/nav/Navbar';
import { useGetArtists } from '../../api/useFetch';
import { getCookie } from '../../utils/Cookie';
import { categoryObj } from '../../utils/Category';
import { useState } from 'react';
import { H1Title } from '../../utils/SlideUp';

const ArtistList = () => {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const handleClickCategory = (id: number) => {
    if (categoryId !== id) setCategoryId(id);
  };
  const data = useGetArtists(categoryId);
  const navigate = useNavigate();
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
            {Object.keys(categoryObj).map((key, idx) => {
              return idx + 1 === categoryId ? (
                <Button
                  theme="highlight"
                  size="mini"
                  key={key}
                  value={key}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    const value = +(e.target as HTMLInputElement).value;
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
                    const value = +(e.target as HTMLInputElement).value;
                    handleClickCategory(value);
                  }}
                >
                  {categoryObj[key]}
                </Button>
              );
            })}
          </S.CategoryContainer>
          <S.ArtistContainer>
            {data?.data.map(artist => (
              <ArtistPreview key={artist.artistId} {...artist} />
            ))}
          </S.ArtistContainer>
        </S.Main>
      </S.Container>
      <Navbar />
    </>
  );
};

export default ArtistList;
