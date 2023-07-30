import { Styled_Home } from './Home.styled';
import MainPageButton from '../../components/buttons/HomePageButton';
import Header from '../../components/header/Header';
import CarouselLogic from '../../components/carousel/CarouselLogic';
import { Input } from '../../components/inputs/Inputs';
import Slogan from '../../components/slogan/Slogan';
import Artistmain from '../../components/artist/ArtistHome';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useHomePage } from '../../zustand/homepage.stores';
import { instance } from '../../api/axios';
import Navbar from '../../components/nav/Navbar';
import { getCookie } from '../../utils/Cookie';
import pianoImage from '../../images/pexels-emre-akyol-16822720.jpg';
import stageImage from '../../images/pexels-monica-silvestre-713149.jpg';
import mapImage from '../../images/pexels-nothing-ahead-9494909.jpg';
import drumImage from '../../images/pexels-ricardo-rojas-3608804.jpg';

const Home = () => {
  const { setCarouselList, setArtistList } = useHomePage();
  const userInfo = getCookie('userInfo');
  const accessToken = getCookie('accessToken');

  useEffect(() => {
    const getCarouselData = async () => {
      try {
        const response = await instance.get('/performance?page=1&size=5');
        setCarouselList(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getCarouselData();
    const getArtistsData = async () => {
      try {
        const response = await instance.get('/artist/all');
        const copy = response.data
          .slice(response.data.length - 4, response.data.length)
          .reverse();
        setArtistList(copy);
      } catch (error) {
        console.error(error);
      }
    };
    getArtistsData();
  }, []);

  return (
    <>
      <Header />
      <Styled_Home.Main>
        <Styled_Home.Container>
          <CarouselLogic />
          <Styled_Home.MiddlePart>
            <Input
              height={30}
              placeholder="준비중인 기능입니다..."
              suffix={true}
              disabled
            />
            {/* <Input height={30} placeholder="검색..." suffix={true} /> */}
            <Styled_Home.AllBtnsDiv>
              <Link to="/performances" style={{ textDecorationLine: 'none' }}>
                <MainPageButton
                  Height={140}
                  ImageUrl={pianoImage}
                  Text="진행중인 공연"
                />
              </Link>
              <div>
                <Link to="/notyet" style={{ textDecorationLine: 'none' }}>
                  <MainPageButton
                    Height={60}
                    ImageUrl={mapImage}
                    Text="지도 검색"
                  />
                </Link>
                {accessToken === undefined || userInfo.hasArtist === false ? (
                  accessToken === undefined ? (
                    <Link to="/login" style={{ textDecorationLine: 'none' }}>
                      <MainPageButton
                        Height={60}
                        ImageUrl={drumImage}
                        Text="아티스트 등록"
                      />
                    </Link>
                  ) : (
                    <Link
                      to="/artistregist"
                      style={{ textDecorationLine: 'none' }}
                    >
                      <MainPageButton
                        Height={60}
                        ImageUrl={drumImage}
                        Text="아티스트 등록"
                      />
                    </Link>
                  )
                ) : (
                  <Link
                    to="/performances/register"
                    style={{ textDecorationLine: 'none' }}
                  >
                    <MainPageButton
                      Height={60}
                      ImageUrl={stageImage}
                      Text="공연 등록"
                    />
                  </Link>
                )}
              </div>
            </Styled_Home.AllBtnsDiv>
          </Styled_Home.MiddlePart>
          <Slogan />
          <Artistmain />
        </Styled_Home.Container>
      </Styled_Home.Main>
      <Navbar />
    </>
  );
};

export default Home;
