import S from './MyPage.style';
import { styled } from 'styled-components';
import Header from '../../components/header/Header';
import { ButtonWithArrow, Button } from '../../components/buttons/Buttons';
import EditIcon from '../../icons/EditIcon';
import ReservationPreview from '../../components/reservation-preview/ReservationPreview';
// import ArtistreviewContainer from '../../components/artist/artistreviewcontainer';
import Review from '../../components/review/Review';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/nav/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { removeCookie, getCookie } from '../../utils/Cookie';
import {
  useGetMember,
  useGetMemberPerformance,
  useGetMemberPerformanced,
  useGetMemberReview,
} from '../../api/useFetch';
import { H1Title } from '../../theme/common/SlideUp';
import { useEffect } from 'react';

export default function Mypage() {
  useEffect(() => {
    if (!getCookie('accessToken')) {
      alert('잘못된 접근입니다.');
      navigate('/', { replace: true });
    }
  }, []);
  const navigate = useNavigate();
  // const { memberId } = useParams();
  const memberData = useGetMember();
  const reservationData = useGetMemberPerformance();
  const pastReservationData = useGetMemberPerformanced();
  const reviewData = useGetMemberReview();

  /** 로그아웃 및 main으로 페이지 이동 */
  const logoutHandler = () => {
    removeCookie('accessToken');
    removeCookie('refreshToken');
    removeCookie('userInfo');
    alert('[로그아웃 성공] 로그아웃 되었습니다');
    navigate('/');
  };

  return (
    <>
      <Header />
      <S.Main>
        <S.Section>
          <S.Title>
            <H1Title.H1span>마이페이지</H1Title.H1span>
          </S.Title>

          <S.ButtonWarppar>
            <Button theme="primary" size="small" onClick={logoutHandler}>
              로그아웃
            </Button>
          </S.ButtonWarppar>
          <S.SubTitleWrappar>
            <S.SubTitle>나의 정보</S.SubTitle>
            <S.UserEditButtonWrappar>
              <Link to={`/editmypage/${getCookie('userInfo')?.memberId}`}>
                <EditIcon />
              </Link>
            </S.UserEditButtonWrappar>
          </S.SubTitleWrappar>
          <S.ProfileWarppar>
            <S.UserDetail>
              <S.UserNickname>{memberData?.email}</S.UserNickname>
              <S.UserNickname>{memberData?.nickname}</S.UserNickname>
            </S.UserDetail>
          </S.ProfileWarppar>
          {/* 아티스트 미등록 사용자는 아티스트 등록 버튼 */}
          {/* 아티스트를 등록한 사용자는 아티스트 페이지 버튼 */}
          {memberData?.hasArtist === true ? (
            <S.ButtonWarppar>
              <Link
                to={`/artist/${getCookie('userInfo')?.artistId}`}
                style={{ textDecoration: 'none' }}
              >
                <ButtonWithArrow
                  theme="theme"
                  style={{ width: '140px' }}
                  text={'아티스트 페이지'}
                ></ButtonWithArrow>
              </Link>
            </S.ButtonWarppar>
          ) : (
            <S.ButtonWarppar>
              <Link to="/artistregist" style={{ textDecoration: 'none' }}>
                <ButtonWithArrow
                  theme="theme"
                  text={'아티스트 등록'}
                ></ButtonWithArrow>
              </Link>
            </S.ButtonWarppar>
          )}
          <S.SubTitle>예약한 공연</S.SubTitle>
          {reservationData?.length ? (
            reservationData.map(reservationData => {
              return (
                <ReservationPreview
                  key={reservationData.performanceId}
                  {...reservationData}
                />
              );
            })
          ) : (
            <S.EmptyContainer>
              <S.EmptyWrapper>
                <S.EmptyTitle>예약중인 공연이 없습니다.</S.EmptyTitle>
                <ConcertEmptyButton>
                  <ButtonWithArrow
                    theme="theme"
                    onClick={() => navigate('/performances')}
                    text="공연예약"
                  ></ButtonWithArrow>
                </ConcertEmptyButton>
              </S.EmptyWrapper>
            </S.EmptyContainer>
          )}
          <S.SubTitle>내가 관람한 공연</S.SubTitle>
          {pastReservationData?.length ? (
            pastReservationData.map(pastReservationData => {
              return (
                <ReservationPreview
                  key={pastReservationData?.performanceId}
                  {...pastReservationData}
                />
              );
            })
          ) : (
            <S.EmptyContainer>
              <S.EmptyWrapper>
                <S.EmptyTitle>관람한 공연이 없습니다.</S.EmptyTitle>
                <ConcertEmptyButton>
                  <ButtonWithArrow
                    theme="theme"
                    onClick={() => navigate('/performances')}
                    text="공연예약"
                  ></ButtonWithArrow>
                </ConcertEmptyButton>
              </S.EmptyWrapper>
            </S.EmptyContainer>
          )}
          <S.MyreviewContainer>
            <S.SubTitle>내가 작성한 후기</S.SubTitle>
            {reviewData?.length ? (
              reviewData.map(reviewData => {
                return (
                  <S.ReviewWrapper key={reviewData?.memberId}>
                    <Review {...reviewData} />
                  </S.ReviewWrapper>
                );
              })
            ) : (
              <S.EmptyContainer>
                <S.EmptyWrapper>
                  <S.EmptyTitle>아직 관람한 공연이 없습니다.</S.EmptyTitle>
                  <ConcertEmptyButton>
                    <ButtonWithArrow
                      theme="theme"
                      onClick={() => navigate('/performances')}
                      text="공연예약"
                    ></ButtonWithArrow>
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

const ConcertEmptyButton = styled(S.ButtonWarppar)`
  display: flex;
  align-self: flex-end;
  padding-bottom: 5px;
`;
