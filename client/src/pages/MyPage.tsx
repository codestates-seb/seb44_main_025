import { styled } from 'styled-components';
import Header from '../components/header/Header';
import {
  ButtonPrimary75px,
  ButtonWithArrowDark,
} from '../components/buttons/Buttons';
import EditIcon from '../icons/EditIcon';
import Concertpreview from '../components/concert-preview/ConcertPreview';
import ArtistreviewContainer from '../components/artist/artistreviewcontainer';
import Review from '../components/review/Review';
import Footer from '../components/footer/Footer';
import Navbar from '../components/nav/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Img from '.././images/우리사랑이대로.jpeg';
import { removeCookie } from '../utils/Cookie';
import { useEffect } from 'react';
import axios from 'axios';
import { ArtistpageReviewList } from '../zustand/artistpage.stores';
import { MyPageList, MyPagePerformanceList } from '../zustand/mypage.stores';

interface MyPage {
  id?: number;
  userId: number;
  nickname: string;
  imageUrl: string;
  profileimageUrl: string;
}

interface Performancelist {
  userId: number;
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

export default function Mypage() {
  const navigate = useNavigate();
  const { reviewData } = ArtistpageReviewList();
  const { setReviewData } = ArtistpageReviewList();
  const { myPageData } = MyPageList();
  const { setMyPageData } = MyPageList();
  const { performanceData } = MyPagePerformanceList();
  const { setPerformanceData } = MyPagePerformanceList();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 아티스트 등록했을때 응답으로 오는 아티스트Id를 filter값으로 넣기
        // 아티스트 등록하면 그 정보가 돌아오고 그 안에 아티스트아이디 있고 그거를 아티스트페이지 주소 뒤에 붙여줌 그리고 페이지 전환을 시켜줌 :/artistid

        // 현재 /member/:memberId 형태로 요청되지만 id 들어가지 않도록 변경될 예정
        const response = await axios.get(
          'https://103f-121-187-22-182.ngrok-free.app/member/1',
          { headers: { 'ngrok-skip-browser-warning': true } }
        );
        const responseperformance = await axios.get(
          'https://103f-121-187-22-182.ngrok-free.app/reservation?userId=1'
        );
        const responsereview = await axios.get(
          'https://103f-121-187-22-182.ngrok-free.app/review?userId=1'
        );
        setMyPageData(response.data);
        setPerformanceData(responseperformance.data);
        setReviewData(responsereview.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  /** 로그아웃 및 main으로 페이지 이동 */
  const logoutHandler = () => {
    removeCookie('accessToken');
    alert('[로그아웃 성공] 로그아웃 되었습니다');
    navigate('/');
  };

  return (
    <>
      <Header />
      <S.Main>
        <S.Section>
          <S.Title>마이페이지</S.Title>
          <S.ButtonWarppar>
            <ButtonPrimary75px onClick={logoutHandler}>
              로그아웃
            </ButtonPrimary75px>
          </S.ButtonWarppar>
          {myPageData.map((el: MyPage) => {
            return (
              <S.ProfileWarppar key={el.userId}>
                <S.ProfileImg src={el.profileimageUrl || Img} />
                <S.UserImg src={el.imageUrl || Img} />
                <S.UserDetail>
                  <S.UserNickname>{el.nickname}</S.UserNickname>
                  <S.UserEdit>
                    <Link to="editmypage">
                      <EditIcon />
                    </Link>
                  </S.UserEdit>
                </S.UserDetail>
              </S.ProfileWarppar>
            );
          })}
          {/* 아티스트 미등록 사용자는 아티스트 등록 버튼 */}
          {/* 아티스트를 등록한 사용자는 아티스트 페이지 버튼 */}
          <S.ButtonWarppar>
            <Link to="artistregist" style={{ textDecoration: 'none' }}>
              <ButtonWithArrowDark text={'아티스트 등록'}></ButtonWithArrowDark>
            </Link>
            <Link to="artist" style={{ textDecoration: 'none' }}>
              <ButtonWithArrowDark
                text={'아티스트 페이지'}
              ></ButtonWithArrowDark>
            </Link>
          </S.ButtonWarppar>

          <S.SubTitle>예약 중인 공연</S.SubTitle>
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

          <S.SubTitle>내가 관람한 공연</S.SubTitle>
          <S.ArtistreviewContainerWrappar>
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
                    <ButtonWithArrowDark text="공연예약"></ButtonWithArrowDark>
                  </ConcertEmptyButton>
                </S.EmptyWrapper>
              </S.EmptyContainer>
            )}
          </S.ArtistreviewContainerWrappar>

          <S.MyreviewContainer>
            <S.SubTitle>내가 작성한 후기</S.SubTitle>
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
                  <S.EmptyTitle>아직 관람한 공연이 없습니다.</S.EmptyTitle>
                  <ConcertEmptyButton>
                    <ButtonWithArrowDark text="공연예약"></ButtonWithArrowDark>
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
  UserDetail: styled.div`
    display: flex;
    margin: 20px 15px 10px 15px;
  `,
  UserNickname: styled.p`
    font-size: var(--p-large-medium-font-size);
    font-weight: var(--p-large-medium-font-weight);
    line-height: var(--p-large-medium-line-height);
    color: var(--font-white-color);
    width: 390px;
  `,
  UserEdit: styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding-right: 3px;
    margin-bottom: 10px;
  `,
  ConcertpreviewContainer: styled.div``,
  SubTitle: styled.header`
    font-size: var(--heading5-font-size);
    font-weight: var(--heading5-font-weight);
    line-height: var(--heading5-line-height);
    color: var(--font-white-color);
    padding: 10px 15px 10px 15px;
  `,
  ArtistreviewContainerWrappar: styled.div`
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
  `,
};

const ConcertEmptyButton = styled(S.ButtonWarppar)`
  display: flex;
  align-self: flex-end;
  padding-bottom: 5px;
`;
