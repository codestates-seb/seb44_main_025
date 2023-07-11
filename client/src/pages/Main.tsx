import { styled } from 'styled-components';
import MainPageButton from '../components/Buttons/MainPageButton';
import HeaderLogoST from '../components/Header/HeaderLogoST';
import CarouselLogic from '../components/Carousel/CarouselLogic';
import { Input } from '../components/Inputs/Inputs';
import Slogan from '../components/Slogan/Slogan';
import Artistmain from '../components/artist/artistmain';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { CarouselList, ArtistList } from '../zustand/mainapi';
import axios from 'axios';
import NavLogin from '../components/Navs/NavLogin';

const Main = () => {
  const { setCarouselData } = CarouselList();
  const { setArtistData } = ArtistList();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/dummy/main.json');
        setCarouselData(response.data.performances);
        setArtistData(response.data.artists);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <HeaderLogoST />
      <S.Main>
        <S.Container>
          <Slogan />
          <CarouselLogic />
          <S.MiddlePart>
            <Input height={30} placeholder="검색..." icon={true} />
            <S.AllBtnsDiv>
              <Link to="/performances">
                <MainPageButton
                  btnH={140}
                  btnImgUrl="./images/pexels-emre-akyol-16822720.jpg"
                  btnText="진행중인 공연"
                />
              </Link>
              <div>
                <Link to="/">
                  <MainPageButton
                    btnH={60}
                    btnImgUrl="./images/pexels-nothing-ahead-9494909.jpg"
                    btnText="지도 검색"
                  />
                </Link>
                <Link to="/artistregistpage">
                  <MainPageButton
                    btnH={60}
                    btnImgUrl="./images/pexels-ricardo-rojas-3608804.jpg"
                    btnText="아티스트 등록"
                  />
                </Link>
              </div>
            </S.AllBtnsDiv>
          </S.MiddlePart>
          <Artistmain />
        </S.Container>
      </S.Main>
      <NavLogin />
    </>
  );
};

const S = {
  Main: styled.main`
    display: flex;
    justify-content: center;
  `,
  Container: styled.div`
    min-height: calc(100vh - 100px);
    height: 800px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    gap: 30px;
    align-items: center;
    width: 390px;
    background-color: var(--theme-background-color);
  `,
  MiddlePart: styled.div`
    width: 390px;
    height: 200px;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
  `,
  AllBtnsDiv: styled.div`
    display: flex;
    flex-flow: row;
    width: 359px;
    justify-content: space-between;
    & > div {
      display: flex;
      flex-flow: column;
      gap: 20px;
    }
  `,
};

export default Main;
