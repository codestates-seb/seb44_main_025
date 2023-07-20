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
import axios from 'axios';
import Navbar from '../../components/nav/Navbar';
import { getCookie } from '../../utils/Cookie';
import { useGetMember } from '../../api/useFetch';

const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

const Home = () => {
  const { setCarouselList, setArtistList } = useHomePage();
  const userInfo = getCookie('userInfo');
  const accessToken = getCookie('accessToken');
  useGetMember();

  useEffect(() => {
    const getCarouselData = async () => {
      try {
        const response = await axios.get('/dummy/main_perfomancelist.json');
        setCarouselList(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCarouselData();
    const getArtistsData = async () => {
      try {
        const response = await axios.get('/dummy/main_artistlist.json');
        setArtistList(response.data.data);
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
            <Input height={30} placeholder="검색..." suffix={true} />
            <Styled_Home.AllBtnsDiv>
              <Link to="/performances" style={{ textDecorationLine: 'none' }}>
                <MainPageButton
                  Height={140}
                  ImageUrl={`${PUBLIC_URL}/피아노.webp`}
                  Text="진행중인 공연"
                />
              </Link>
              <div>
                <Link to="/" style={{ textDecorationLine: 'none' }}>
                  <MainPageButton
                    Height={60}
                    ImageUrl={`${PUBLIC_URL}/pexels-nothing-ahead-9494909.jpg`}
                    Text="지도 검색"
                  />
                </Link>
                {accessToken === undefined || userInfo.hasArtist === false ? (
                  accessToken === undefined ? (
                    <Link to="/login" style={{ textDecorationLine: 'none' }}>
                      <MainPageButton
                        Height={60}
                        ImageUrl={`${PUBLIC_URL}/pexels-ricardo-rojas-3608804.jpg`}
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
                        ImageUrl="./images/pexels-ricardo-rojas-3608804.jpg"
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
                      ImageUrl="./images/pexels-monica-silvestre-713149.jpg"
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
