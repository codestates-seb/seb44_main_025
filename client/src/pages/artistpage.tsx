import { styled } from 'styled-components';
import HeaderLogoST from '../components/Header/HeaderLogoST';
import { ButtonWithArrowDark } from '../components/Buttons/Buttons';
import EditIcon from '../icons/EditIcon';
import Concertpreview from '../components/concertpreview/concertpreview';
import ArtistreviewContainer from '../components/artist/artistreviewcontainer';
import Review from '../components/review/review';
import Footer from '../components/footer';
import NavMypage from '../components/Navs/NavMypage';
import Img from '.././images/우리사랑이대로.jpeg';
import { Link } from 'react-router-dom';

export default function Artistpage() {
  return (
    <>
      <HeaderLogoST />
      <S.Main>
        <S.Section>
          <S.Title>아티스트페이지</S.Title>
          <S.ProfileImg src={Img} />
          <S.UserImg src={Img} />
          <S.ArtistDetail>
            <S.ArtistContent>아티스트</S.ArtistContent>
            <S.ArtistContent>SNS Link</S.ArtistContent>
            <S.UserEdit>
              <Link to="/artistregistpage">
                <EditIcon />
              </Link>
            </S.UserEdit>
          </S.ArtistDetail>
          <S.ArtistIntrodution>
            <S.SubTitle>소개</S.SubTitle>
            <S.ArtistIntrodutionContainer>
              <S.ArtistContent>안녕하세요~!</S.ArtistContent>
            </S.ArtistIntrodutionContainer>
          </S.ArtistIntrodution>
          <S.ConcertpreviewContainer>
            <S.SubTitle>준비 중인 공연</S.SubTitle>
            <Concertpreview />
          </S.ConcertpreviewContainer>
          <S.EmptyContainer>
            <S.SubTitle>준비 중인 공연</S.SubTitle>
            <S.EmptyWrapper>
              <S.EmptyTitle>현재 준비중인 공연이 없습니다.</S.EmptyTitle>
              <ConcertEmptyButton>
                <ButtonWithArrowDark text="공연등록"></ButtonWithArrowDark>
              </ConcertEmptyButton>
            </S.EmptyWrapper>
          </S.EmptyContainer>
          <S.SubTitle>공연 기록</S.SubTitle>
          <ArtistreviewContainer />
          <S.EmptyContainer>
            <S.SubTitle>공연 기록</S.SubTitle>
            <S.EmptyWrapper>
              <S.EmptyTitle>아직 진행한 공연이 없습니다.</S.EmptyTitle>
              <ConcertEmptyButton>
                <ButtonWithArrowDark text="공연등록"></ButtonWithArrowDark>
              </ConcertEmptyButton>
            </S.EmptyWrapper>
          </S.EmptyContainer>
          <S.MyreviewContainer>
            <S.SubTitle>아티스트 후기</S.SubTitle>
            <S.ReviewWrapper>
              <Review />
              <Review />
              <Review />
            </S.ReviewWrapper>
          </S.MyreviewContainer>
          <Footer />
        </S.Section>
      </S.Main>
      <NavMypage />
    </>
  );
}

const S = {
  Main: styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #1e1e1e;
  `,
  Section: styled.section`
    width: 390px;
    min-height: calc(100vh - 100px);
    background-color: var(--theme-background-color);
  `,
  Title: styled.header`
    font-size: var(--heading1-font-size);
    font-weight: var(--heading1-font-weight);
    line-height: var(--heading1-line-height);
    color: var(--font-white-color);
    width: 390px;
    padding: 20px 15px 10px 15px;
  `,
  ButtonWarppar: styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 15px;
    margin-bottom: 10px;
  `,
  ProfileImg: styled.img`
    width: 390px;
    height: 150px;
    padding: 0px 15px;
  `,
  UserImg: styled.img`
    position: relative;
    width: 100px;
    height: 100px;
    margin-top: -60px;
    margin-left: 15px;
    border: 3px solid transparent;
    display: flex;
    align-self: flex-start;
    border-radius: 50px;
    background-image: linear-gradient(#fff, #fff),
      linear-gradient(
        to top right,
        var(--image-border-bottom-color),
        var(--image-border-top-color)
      );
    background-origin: border-box;
    background-clip: content-box, border-box;
    z-index: 1;
  `,
  ArtistDetail: styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 15px 10px 15px;
  `,
  ArtistContent: styled.p`
    font-size: var(--p-small-medium-font-size);
    font-weight: var(--p-small-medium-font-weight);
    line-height: var(--p-small-medium-line-height);
    color: var(--font-white-color);
  `,
  UserEdit: styled.div`
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
    padding-right: 3px;
    margin-bottom: 20px;
    margin-top: -50px;
  `,
  ArtistIntrodution: styled.div`
    margin-top: 20px;
  `,
  ArtistIntrodutionContainer: styled.div`
    width: 360px;
    height: 70px;
    margin: 0px 15px 0px 15px;
  `,
  ConcertpreviewContainer: styled.div``,
  SubTitle: styled.header`
    font-size: var(--heading5-font-size);
    font-weight: var(--heading5-font-weight);
    line-height: var(--heading5-line-height);
    color: var(--font-white-color);
    padding: 10px 15px 10px 15px;
  `,
  EmptyContainer: styled.div``,
  EmptyWrapper: styled.div`
    width: 360px;
    height: 100px;
    background-color: var(--font-mid-color);
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    margin-left: 15px;
  `,
  EmptyTitle: styled.header`
    font-size: var(--p-small-regular-font-size);
    line-height: var(--p-small-regular-font-weight);
    font-weight: var(--p-small-regular-line-height);
    color: var(--font-highlight-color);
    padding: 0px 15px 10px 15px;
  `,
  MyreviewContainer: styled.div``,
  ReviewWrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,
};

const ConcertEmptyButton = styled(S.ButtonWarppar)`
  display: flex;
  align-self: flex-end;
  padding-bottom: 5px;
`;
