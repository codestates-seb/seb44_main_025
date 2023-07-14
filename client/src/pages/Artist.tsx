import { styled } from 'styled-components';
import Header from '../components/header/Header';
import { ButtonWithArrowDark } from '../components/buttons/Buttons';
import EditIcon from '../icons/EditIcon';
import Concertpreview from '../components/concert-preview/ConcertPreview';
import ArtistreviewContainer from '../components/artist/artistreviewcontainer';
import Review from '../components/review/Review';
import Footer from '../components/footer/Footer';
import Img from '.././images/우리사랑이대로.jpeg';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/nav/Navbar';
import { useEffect } from 'react';
import axios from 'axios';
import {
  ArtistpageList,
  ArtistpagePerformanceList,
  ArtistpageReviewList,
} from '../zustand/artistpage.stores';

interface Artistpage {
  id?: number;
  artistId: number;
  artistname: string;
  imageUrl: string;
  profileimageUrl: string;
  snslink: string;
  content: string;
}

interface Performancelist {
  userId?: number;
  title: string;
  artistId: number;
  category: string;
  date: string;
  price: number;
  artistname: string;
  categoryId: number;
  imageUrl: string;
  id?: number;
  performanceId?: number;
}

interface Reviewlist {
  nickname: string;
  reviewtitle: string;
  artistId?: number;
  content: string;
}

export default function Artistpage() {
  const { artistpageData } = ArtistpageList();
  const { setArtistpageData } = ArtistpageList();
  const { performanceData } = ArtistpagePerformanceList();
  const { setPerformanceData } = ArtistpagePerformanceList();
  const { reviewData } = ArtistpageReviewList();
  const { setReviewData } = ArtistpageReviewList();
  const { artistId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 아티스트 등록했을때 응답으로 오는 아티스트Id를 filter값으로 넣기
        // 아티스트 등록하면 그 정보가 돌아오고 그 안에 아티스트아이디 있고 그거를 아티스트페이지 주소 뒤에 붙여줌 그리고 페이지 전환을 시켜줌 :/artistid
        const response = await axios.get(
          `https://103f-121-187-22-182.ngrok-free.app/artist/${artistId}`,
          { headers: { 'ngrok-skip-browser-warning': true } }
        );
        const responseperformance = await axios.get(
          'http://localhost:5001/performance?artistId=4'
        );
        const responsereview = await axios.get(
          'http://localhost:5000/review?artistId=4'
        );
        setArtistpageData(response.data);
        setPerformanceData(responseperformance.data);
        setReviewData(responsereview.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // const filteredData: Artistpage[] = artistpageData.filter(
  //   (item: Artistpage) => item.artistId
  // );

  return (
    <>
      <Header />
      <S.Main>
        <S.Section>
          <S.Title>아티스트페이지</S.Title>
          {/* 로그인한 userId에 맞는 artistId를 보여주는거 */}
          {artistpageData
            .filter((item: Artistpage) => item.id === 4)
            .map((el: Artistpage) => {
              return (
                <S.ProfileWarppar key={el.artistId}>
                  <S.ProfileImg src={el.profileimageUrl || Img} />
                  <S.UserImg src={el.imageUrl || Img} />
                  <S.ArtistDetail>
                    <S.ArtistContent>{el.artistname}</S.ArtistContent>
                    <S.ArtistContent>{el.snslink}</S.ArtistContent>
                    <S.UserEdit>
                      <Link to="/artistregist">
                        <EditIcon />
                      </Link>
                    </S.UserEdit>
                  </S.ArtistDetail>
                  <S.ArtistIntrodution>
                    <S.SubTitle>소개</S.SubTitle>
                    <S.ArtistIntrodutionContainer>
                      <S.ArtistContent>{el.content}</S.ArtistContent>
                    </S.ArtistIntrodutionContainer>
                  </S.ArtistIntrodution>
                </S.ProfileWarppar>
              );
            })}
          {/* 해당 아티스트가 준비중인 공연이 있으면 */}
          <S.SubTitle>준비 중인 공연</S.SubTitle>
          {performanceData.length !== 0 ? (
            performanceData.map((el: Performancelist) => {
              return (
                <Concertpreview
                  performanceId={el.performanceId || 1}
                  key={el.userId}
                  posterImg={el.imageUrl}
                  title={el.title}
                  artistname={el.artistname}
                  category={el.category}
                  price={el.price}
                  date={el.date}
                  categoryId={el.categoryId}
                />
              );
            })
          ) : (
            <S.EmptyContainer>
              <S.EmptyWrapper>
                <S.EmptyTitle>현재 예약중인 공연이 없습니다.</S.EmptyTitle>
                <ConcertEmptyButton>
                  <ButtonWithArrowDark text="공연예약"></ButtonWithArrowDark>
                </ConcertEmptyButton>
              </S.EmptyWrapper>
            </S.EmptyContainer>
          )}
          {/* artistId에 맞는 공연 정보를 보여주는거 */}

          <S.SubTitle>공연 기록</S.SubTitle>
          {/* 완료한 공연이 있다면 받아오고 구분해서 받아오기*/}
          <S.ArtistHistoryContainerWrappar>
            {performanceData.length !== 0 ? (
              performanceData.map((el: Performancelist) => {
                return (
                  <ArtistreviewContainer
                    key={el.userId}
                    imageUrl={el.imageUrl}
                    content="후기등록"
                  />
                );
              })
            ) : (
              <S.EmptyContainer>
                <S.EmptyWrapper>
                  <S.EmptyTitle>아직 관람한 공연이 없습니다.</S.EmptyTitle>
                  <ConcertEmptyButton>
                    <ButtonWithArrowDark text="공연등록"></ButtonWithArrowDark>
                  </ConcertEmptyButton>
                </S.EmptyWrapper>
              </S.EmptyContainer>
            )}
          </S.ArtistHistoryContainerWrappar>

          <S.MyreviewContainer>
            <S.SubTitle>아티스트 후기</S.SubTitle>
            {reviewData.length !== 0 ? (
              reviewData.map((el: Reviewlist, i) => {
                return (
                  <S.ReviewWrapper key={i}>
                    <Review
                      nickname={el.nickname}
                      reviewtitle={el.reviewtitle}
                      content={el.content}
                    />
                  </S.ReviewWrapper>
                );
              })
            ) : (
              <S.EmptyContainer>
                <S.EmptyWrapper>
                  <S.EmptyTitle>완료한 공연이 없습니다.</S.EmptyTitle>
                  <ConcertEmptyButton>
                    <ButtonWithArrowDark text="공연등록"></ButtonWithArrowDark>
                  </ConcertEmptyButton>
                </S.EmptyWrapper>
              </S.EmptyContainer>
            )}
          </S.MyreviewContainer>

          <Footer />
        </S.Section>
      </S.Main>
      <Navbar />
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
  ProfileWarppar: styled.div``,
  ProfileImg: styled.img`
    width: 390px;
    height: 150px;
    padding: 0px 15px;
  `,
  UserImg: styled.img`
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
  ArtistHistoryContainerWrappar: styled.div`
    display: flex;
    /* flex-flow: row; */
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
    /* height: 100px; */
  `,
};

const ConcertEmptyButton = styled(S.ButtonWarppar)`
  display: flex;
  align-self: flex-end;
  padding-bottom: 5px;
`;
function setArtistpageData(performances: any) {
  throw new Error('Function not implemented.');
}
