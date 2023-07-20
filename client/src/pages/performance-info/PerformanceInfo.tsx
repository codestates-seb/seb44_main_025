import * as S from './PerformanceInfo.style';
import Header from '../../components/header/Header';
import { Button } from '../../components/buttons/Buttons';
// import ArtistContainer from '../../components/artist/artistcontainer';
import Review from '../../components/review/Review';
import { useNavigate, useParams } from 'react-router-dom';
import { EditorReadOnly } from '../../components/inputs/editor/Editor';
import { useGetPerformance } from '../../api/useFetch';
import ReservationModal from '../../components/modal/Reservation';
import { useEffect, useState } from 'react';
import { categoryObj } from '../../utils/Category';
import Navbar from '../../components/nav/Navbar';
import { Map } from '../../components/postcode/Postcode';
import { getCookie } from '../../utils/Cookie';
import { H1Title } from '../../theme/common/SlideUp';
import { getDateTime } from '../../utils/Format';

const PerformanceInfo = () => {
  const { performanceId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const data = useGetPerformance(performanceId);
  const [isStale, setIsStale] = useState(false);
  useEffect(() => {
    if (new Date(data?.date as string) < new Date()) {
      setIsStale(true);
    } else {
      setIsStale(false);
    }
  }, [data]);
  const navigate = useNavigate();

  const isLoggedIn = getCookie('accessToken');
  // Note: 현재 접속중인 계정의 아티스트 Id 필요
  const currentArtistId = getCookie('userInfo')?.artistId;
  return (
    <>
      <Header precious={true} />
      <S.Container>
        <S.Main>
          <S.ButtonHeadingContainer>
            <H1Title.H1>
              <H1Title.H1span>공연정보</H1Title.H1span>
            </H1Title.H1>
            {/* TODO: PerformanceArtist Id 정확한 값 가져오기*/}
            {!isStale &&
              currentArtistId ===
                data?.performanceArtist?.performanceArtistList[
                  data?.performanceId
                ] && (
                <Button
                  size="medium"
                  theme="primary"
                  onClick={() => navigate('/performances/register')}
                >
                  공연 정보 수정하기
                </Button>
              )}
          </S.ButtonHeadingContainer>
          <S.SummaryContainer>
            <S.Poster src={data?.imageUrl || ''} />
            <S.Summary>
              <p>공연명</p>
              <p>{data?.title}</p>
              <p>날짜</p>
              <p>{data?.date && getDateTime(data?.date as string)}</p>
              <p>금액</p>
              <p>{data?.price}원</p>
              <p>남은 좌석 수</p>
              <p>{data?.leftSeat || data?.totalSeat}석</p>
            </S.Summary>
          </S.SummaryContainer>
          <S.CategoryContainer>
            {Object.keys(categoryObj).map(key => {
              return categoryObj[key] === data?.category ? (
                <Button theme="highlight" size="mini" key={key} disabled>
                  {categoryObj[key]}
                </Button>
              ) : (
                <Button theme="theme" size="mini" key={key} disabled>
                  {categoryObj[key]}
                </Button>
              );
            })}
            {data?.category === null && (
              <Button theme="highlight" size="mini" disabled>
                기타
              </Button>
            )}
          </S.CategoryContainer>
          <Map address={data?.place} />
          <S.Heading3>공연설명</S.Heading3>
          <EditorReadOnly content={data?.content.body} />
          {/* TODO: 구현되면 그 때 보여주기
          <S.Heading3>아티스트 정보</S.Heading3>
            <ArtistContainer />*/}
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
          )}
          {/* TODO: 현재 좌석수 > 0 ? 예약 버튼 활성화 : 예약 버튼 비활성화 */}
          {!isModalOpen && (
            <S.BottomStickyContainer>
              <Button
                theme="primary"
                size="large"
                onClick={() => {
                  if (!isLoggedIn) {
                    navigate('/login');
                    return;
                  }
                  if (isStale) {
                    navigate(`/performances/review/write/${performanceId}`);
                  } else {
                    setIsModalOpen(true);
                  }
                }}
              >
                {isStale ? '후기 작성' : '예약하기'}
              </Button>
            </S.BottomStickyContainer>
          )}
          <>
            {isModalOpen && data && (
              <ReservationModal
                {...data}
                closeModal={() => {
                  setIsModalOpen(false);
                }}
              />
            )}
          </>
        </S.Main>
      </S.Container>
      <Navbar />
    </>
  );
};

export default PerformanceInfo;
