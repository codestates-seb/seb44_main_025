import * as S from './PerformanceInfo.style';
import Header from '../../components/header/Header';
import { Button } from '../../components/buttons/Buttons';
import ArtistContainer from '../../components/artist/artistcontainer';
import Review from '../../components/review/Review';
import { useNavigate, useParams } from 'react-router-dom';
import { EditorReadOnly } from '../../components/inputs/editor/Editor';
import { useGetPerformance } from '../../api/useFetch';
import ReservationModal from '../../components/modal/Reservation';
import { useEffect, useState } from 'react';
import { categoryObj } from '../../utils/Category';
import Navbar from '../../components/nav/Navbar';

// TODO: props로 렌더링하기
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
  // const data = useGetPerformance({ id: 1 });
  const navigate = useNavigate();
  // TODO: 요청이 구현되기 전까지 등록된 글을 확인할 수 있도록 하기 위한 state 관리
  // const content = useEditorStore(state => state.content);
  // TODO: 로그인 상태관리 로직 추가하기
  const isLoggedIn = true;
  return (
    <>
      <Header precious={true} />
      <S.Container>
        <S.Main>
          <S.ButtonHeadingContainer>
            <S.Heading1>공연정보</S.Heading1>
            {/* TODO: 공연 일정 이전 && 공연을 등록한 유저에게만 보여주기*/}
            <Button
              size="medium"
              theme="primary"
              onClick={() => navigate('/performances/register')}
            >
              공연 정보 수정하기
            </Button>
          </S.ButtonHeadingContainer>
          <S.SummaryContainer>
            <S.Poster src={data?.imageUrl || ''} />
            <S.Summary>
              <p>공연명</p>
              <p>{data?.title}</p>
              <p>날짜</p>
              <p>{new Date(data?.date as string).toLocaleDateString()}</p>
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
          <S.Heading3>공연설명</S.Heading3>
          <EditorReadOnly content={data?.content.body} />
          <S.Heading3>공연장 위치</S.Heading3>
          <S.Map></S.Map>
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
          )}
          <S.BottomStickyContainer>
            {/* TODO: 공연 일정과 현재 시각 비교 -> 예약하기 / 후기등록 조건부 렌더링 */}
            {/* TODO: 현재 좌석수 > 0 ? 예약 버튼 활성화 : 예약 버튼 비활성화 */}
            {!isModalOpen && (
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
            )}
            {isModalOpen && <ReservationModal />}
          </S.BottomStickyContainer>
        </S.Main>
      </S.Container>
      <Navbar />
    </>
  );
};

export default PerformanceInfo;
