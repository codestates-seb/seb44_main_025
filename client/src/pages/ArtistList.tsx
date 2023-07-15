import { styled } from 'styled-components';
import { Button } from '../components/buttons/Buttons';
import { useNavigate } from 'react-router-dom';
import ArtistPreview from '../components/artistpreview/ArtistPreview';
import Header from '../components/header/Header';
import Navbar from '../components/nav/Navbar';
import { useGetArtists } from '../api/useFetch';

const S = {
  Heading1: styled.h1`
    margin-top: 20px;
    margin-right: auto;
    margin-left: 15px;
    color: white;
    font-size: var(--heading1-font-size);
    font-weight: var(--heading1-font-weight);
    line-height: var(--heading1-line-height);
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
    margin-top: 20px;
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
    min-width: 360px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 20px;
  `,
  ArtistContainer: styled.div`
    width: 360px;
    & div {
      margin: 8px 0px;
    }
  `,
};

// TODO: props로 렌더링하기
const ArtistList = () => {
  // TODO: 실제 data로 렌더링하기
  const data = useGetArtists();
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
          <S.Heading1>아티스트</S.Heading1>
          {/* TODO: 공연 일정 이전 && 공연을 등록한 유저에게만 보여주기 */}
          <S.ButtonContainer>
            <Button
              size="medium"
              theme="primary"
              // 아티스트 등록 페이지
              onClick={() => navigate('/artistregist')}
            >
              아티스트 등록하기
            </Button>
          </S.ButtonContainer>
          {/* TODO: 클릭 시 카테고리별 검색 결과 출력하기 */}
          {/* 일단 아티스트는 장르별 분류 미구현
          <S.CategoryContainer>
            {Object.keys(categoryObj).map(key => (
              <Button theme="theme" size="mini" key={key}>
                {categoryObj[key]}
              </Button>
            ))}
          </S.CategoryContainer> */}
          <S.ArtistContainer>
            {data?.data.map(artist => (
              <ArtistPreview
                key={artist.artistId}
                id={artist.artistId}
                imgurl={artist.imageUrl}
                nickname={artist.artistName}
                snsLink={['']}
              />
            ))}
          </S.ArtistContainer>
        </S.Main>
      </S.Container>
      <Navbar />
    </>
  );
};

export default ArtistList;
