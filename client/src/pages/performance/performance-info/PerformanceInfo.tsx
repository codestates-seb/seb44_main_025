import * as S from './PerformanceInfo.style';
import { Button } from '../../../components/buttons/Buttons';
// import ArtistContainer from '../../components/artist/artistcontainer';
import Review from '../../../components/review-preview/ReviewPreview';
import { useNavigate, useParams } from 'react-router-dom';
import { EditorReadOnly } from '../../../components/editor/Editor';
import ReservationModal from '../../../components/modal/Reservation';
import React, { useEffect, useState } from 'react';
import { categoryObj } from '../../../utils/Category';
import { Map } from '../../../components/postcode/Postcode';
import { getCookie } from '../../../utils/Cookie';
import { H1Title } from '../../../theme/common/SlideUp';
import { getDateTime } from '../../../utils/Format';
import { PerformanceType } from '../../../model/Performance';
import { deletePerformance } from '../../../api/fetchAPI';
import ReviewRegister from '../../../components/modal/review-register/ReviewRegister';
import {
  useGetArtistReview,
  useGetMemberPerformanced,
  useGetReservations,
} from '../../../api/useFetch';
import {
  checkIsReserved,
  filterReservationByPerformanceId,
} from '../../../utils/Filter';
import { getButtonText } from '../../../utils/Condition';
import ReservationTicket from '../../../components/modal/ReservationTicket';

const PerformanceInfo = ({
  setIsEditing,
  performance,
}: {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  performance: PerformanceType;
}) => {
  const reservations = useGetReservations();
  const pastReservations = useGetMemberPerformanced();
  const [isTicketModalOpen, setIsReservationModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isReservationTicketOpen, setIsReservationTicketOpen] = useState(false);
  const { performanceId } = useParams();
  const [isReserved, setIsReserved] = useState(false);
  const artistReviews = useGetArtistReview(
    Object.values(performance?.performanceArtist?.performanceArtistList)[0]
  );
  useEffect(() => {
    if (reservations && performanceId) {
      setIsReserved(
        checkIsReserved(
          isStale ? pastReservations || [] : reservations || [],
          +performanceId
        )
      );
    }
  }, [reservations]);
  const [isStale, setIsStale] = useState(true);
  // Note: 삭제 기능 비활성화
  const handleClickDelete = () => {
    if (performanceId) {
      const isConfirmed = confirm('공연을 삭제하시겠습니까?');
      if (isConfirmed) {
        deletePerformance(performanceId).then(data => {
          if (data) {
            navigate('/performances');
          } else {
            alert('공연 삭제에 실패하였습니다.');
          }
        });
      }
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    if (new Date(performance?.date as string) < new Date()) {
      setIsStale(true);
    } else {
      setIsStale(false);
    }
  }, [performance]);
  const navigate = useNavigate();

  const isLoggedIn = getCookie('accessToken');
  // Note: 현재 접속중인 계정의 아티스트 Id 필요
  const currentArtistId = getCookie('userInfo')?.artistId;
  return (
    <>
      <S.ButtonHeadingContainer>
        <H1Title.H1>
          <H1Title.H1span>공연정보</H1Title.H1span>
        </H1Title.H1>
        {/* TODO: PerformanceArtist Id 정확한 값 가져오기*/}
        {!isStale &&
          currentArtistId ===
            Object.values(
              performance?.performanceArtist?.performanceArtistList
            )[0] && (
            <>
              <Button
                size="small"
                theme="primary"
                onClick={() => setIsEditing(true)}
              >
                정보 수정
              </Button>
              <Button
                size="small"
                theme="highlightBorder"
                onClick={() => handleClickDelete()}
              >
                정보 삭제
              </Button>
            </>
          )}
      </S.ButtonHeadingContainer>
      <S.SummaryContainer>
        <S.Poster src={performance?.imageUrl || ''} />
        <S.Summary>
          <p>공연명</p>
          <p>{performance?.title}</p>
          <p>날짜</p>
          <p>{performance?.date && getDateTime(performance?.date as string)}</p>
          <p>금액</p>
          <p>₩{performance?.price.toLocaleString()}</p>
          <p>남은 좌석 수</p>
          <p>{performance?.leftSeat || performance?.totalSeat}석</p>
        </S.Summary>
      </S.SummaryContainer>
      <S.CategoryContainer>
        {Object.keys(categoryObj).map(key => {
          return categoryObj[key] === performance?.category ? (
            <Button theme="highlight" size="mini" key={key} disabled>
              {categoryObj[key]}
            </Button>
          ) : (
            <Button theme="theme" size="mini" key={key} disabled>
              {categoryObj[key]}
            </Button>
          );
        })}
        {performance?.category === null && (
          <Button theme="highlight" size="mini" disabled>
            기타
          </Button>
        )}
      </S.CategoryContainer>
      <Map address={performance?.place} />
      <S.Heading3>공연설명</S.Heading3>
      <EditorReadOnly content={performance?.content.body} />
      {/* TODO: 구현되면 그 때 보여주기(아티스트 정보 + 후기)
          <S.Heading3>아티스트 정보</S.Heading3>
            <ArtistContainer />
      {isStale && (
        <>
          <S.Heading3>후기</S.Heading3>
          <S.ReviewContainer>
            <Review
              nickname={''}
              reviewTitle={''}
              content={''}
              createdAt={''}
            />
            <Review
              nickname={''}
              reviewTitle={''}
              content={''}
              createdAt={''}
            />
          </S.ReviewContainer>
        </>
      )}*/}
      {!isTicketModalOpen &&
        currentArtistId !==
          Object.values(
            performance?.performanceArtist?.performanceArtistList
          )[0] && (
          <S.BottomStickyContainer>
            <Button
              theme="primary"
              size="large"
              disabled={
                (performance.totalSeat === 0 && !isStale) ||
                (isStale && !isReserved)
              }
              onClick={() => {
                if (!isLoggedIn) {
                  navigate('/login');
                  return;
                }
                if (isStale && isReserved) {
                  setIsReviewModalOpen(true);
                } else if (!isStale && !isReserved) {
                  setIsReservationModalOpen(true);
                } else {
                  setIsReservationTicketOpen(true);
                }
              }}
            >
              {getButtonText(isStale, isReserved, performance.totalSeat)}
            </Button>
          </S.BottomStickyContainer>
        )}
      {isTicketModalOpen && performance && (
        <ReservationModal
          performance={performance}
          closeModal={() => {
            setIsReservationModalOpen(false);
          }}
        />
      )}
      {isReviewModalOpen && performance && (
        <ReviewRegister
          performance={performance}
          closeModal={() => {
            setIsReviewModalOpen(false);
          }}
        />
      )}
      {isReservationTicketOpen && isReserved && reservations && (
        <ReservationTicket
          reservation={performance}
          {...filterReservationByPerformanceId(
            reservations,
            performance.performanceId
          )}
          onClick={() => {
            setIsReservationTicketOpen(false);
          }}
        />
      )}
      <S.Heading3>아티스트의 공연 후기</S.Heading3>
      {artistReviews?.length ? (
        artistReviews.map(artistReview => {
          return (
            <S.ReviewDiv key={artistReview.reviewId}>
              <Review {...artistReview} />
            </S.ReviewDiv>
          );
        })
      ) : (
        <S.EmptyWrapper>
          <S.EmptyTitle>완료한 공연이 없습니다.</S.EmptyTitle>
        </S.EmptyWrapper>
      )}
    </>
  );
};

export default PerformanceInfo;
