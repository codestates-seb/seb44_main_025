import { styled } from 'styled-components';
import { ButtonPrimary160px } from '../components/buttons/Buttons';
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
  console.log(data);
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
          <S.Heading1>아티스트 리스트</S.Heading1>
          {/* TODO: 공연 일정 이전 && 공연을 등록한 유저에게만 보여주기 */}
          <S.ButtonContainer>
            <ButtonPrimary160px
              // 아티스트 등록 페이지
              onClick={() => navigate('/artistregist')}
            >
              아티스트 등록하기
            </ButtonPrimary160px>
          </S.ButtonContainer>
          {/* TODO: 클릭 시 카테고리별 검색 결과 출력하기 */}
          {/* 일단 아티스트는 장르별 분류 미구현
          <S.CategoryContainer>
            <ButtonMini>팝</ButtonMini>
            <ButtonMini>락</ButtonMini>
            <ButtonMini>R&B</ButtonMini>
            <ButtonMini>힙합</ButtonMini>
            <ButtonMini>재즈</ButtonMini>
            <ButtonMini>밴드</ButtonMini>
            <ButtonMini>댄스</ButtonMini>
          </S.CategoryContainer> */}
          <S.ArtistContainer>
            {data?.data.map((v, i) => (
              <ArtistPreview
                key={v.artistId}
                id={v.artistId}
                imgurl=""
                nickname={v.artistName}
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
