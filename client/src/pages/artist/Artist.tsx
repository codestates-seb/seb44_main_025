import { styled } from 'styled-components';
import S from './Artist.style';
import LogoImg from '../.././images/이투플아티스트슬로건.png';
import Header from '../../components/header/Header';
import { ButtonWithArrowDark } from '../../components/buttons/Buttons';
import EditIcon from '../../icons/EditIcon';
import Concertpreview from '../../components/concert-preview/ConcertPreview';
import ArtistreviewContainer from '../../components/artist/artistreviewcontainer';
import Review from '../../components/review-preview/ReviewPreview';
import Footer from '../../components/footer/Footer';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/nav/Navbar';
import {
  useGetArtist,
  useGetArtistPerfomance,
  useGetArtistPerfomanced,
  useGetArtistReview,
} from '../../api/useFetch';
import { getCookie } from '../../utils/Cookie';

export default function Artistpage() {
  const navigate = useNavigate();
  const { artistId } = useParams();

  /** 불러온 fetch함수에 params로 artistId를 전달 해서 받은 데이터 */
  const artistData = useGetArtist(artistId);
  const artistPerformanceData = useGetArtistPerfomance(artistId);
  const artistPerformancedData = useGetArtistPerfomanced(artistId);
  const artistReviewData = useGetArtistReview(artistId);

  return (
    <>
      <Header />
      <S.Main>
        <S.Section>
          <S.Title>아티스트페이지</S.Title>
          {/* 로그인한 userId에 맞는 artistId를 보여주는거 */}
          <S.ProfileWarppar key={artistData?.artistId}>
            <S.LogoImg src={LogoImg} />
            <S.ArtistImg src={artistData?.imageUrl} />
            <S.ArtistDetail>
              <S.ArtistName>{artistData?.artistName}</S.ArtistName>
              <S.ArtistSns href={artistData?.snsLink} target="_blank">
                SNS링크
              </S.ArtistSns>
            </S.ArtistDetail>
            {artistId && getCookie('userInfo')?.artistId === +artistId ? (
              <S.ArtistEdit>
                <Link to={`/artistedit/${getCookie('userInfo').artistId}`}>
                  <EditIcon />
                </Link>
              </S.ArtistEdit>
            ) : (
              <S.ArtistEdit style={{ display: 'none' }}>
                <Link to={`/artistedit/${getCookie('userInfo')?.artistId}`}>
                  <EditIcon />
                </Link>
              </S.ArtistEdit>
            )}

            <S.ArtistIntrodution>
              {/* <S.SubTitle>소개</S.SubTitle> */}
              <S.ArtistIntrodutionContainer>
                <S.ArtistContent>{artistData?.content}</S.ArtistContent>
              </S.ArtistIntrodutionContainer>
            </S.ArtistIntrodution>
          </S.ProfileWarppar>
          {/* 해당 아티스트가 준비중인 공연이 있으면 */}
          <S.SubTitle>준비 중인 공연</S.SubTitle>
          {/*  artistPerformanceData있는 날짜가 현재 시간보다 뒤에 있으면*/}
          {artistPerformanceData?.data.length ? (
            artistPerformanceData?.data.map(artistPerformanceData => {
              return (
                <Concertpreview
                  key={artistPerformanceData.performanceId}
                  {...artistPerformanceData}
                />
              );
            })
          ) : (
            <S.EmptyContainer>
              <S.EmptyWrapper>
                <S.EmptyTitle>준비중인 공연이 없습니다.</S.EmptyTitle>
                <ConcertEmptyButton>
                  <ButtonWithArrowDark
                    onClick={() => navigate('/performances/register')}
                    text="공연등록"
                  ></ButtonWithArrowDark>
                </ConcertEmptyButton>
              </S.EmptyWrapper>
            </S.EmptyContainer>
          )}
          {/* artistId에 맞는 공연 정보를 보여주는거 */}

          <S.SubTitle>공연 기록</S.SubTitle>
          {/* 완료한 공연이 있다면 받아오고 구분해서 받아오기*/}
          <S.ArtistHistoryContainerWrappar>
            {artistPerformancedData?.data.length ? (
              artistPerformancedData?.data.map(artistPerformancedData => {
                return (
                  <ArtistreviewContainer
                    key={artistPerformancedData?.performanceId}
                    performanceId={artistPerformancedData?.performanceId}
                    imageUrl={artistPerformancedData?.imageUrl}
                    content="후기보기"
                  />
                );
              })
            ) : (
              <S.EmptyContainer>
                <S.EmptyWrapper>
                  <S.EmptyTitle>완료한 공연이 없습니다.</S.EmptyTitle>
                  <ConcertEmptyButton>
                    <ButtonWithArrowDark
                      onClick={() => navigate('/performances/register')}
                      text="공연등록"
                    ></ButtonWithArrowDark>
                  </ConcertEmptyButton>
                </S.EmptyWrapper>
              </S.EmptyContainer>
            )}
          </S.ArtistHistoryContainerWrappar>

          <S.MyreviewContainer>
            <S.SubTitle>아티스트 후기</S.SubTitle>
            {artistReviewData?.length ? (
              artistReviewData.map(artistReviewData => {
                return (
                  <S.ReviewWrapper key={artistReviewData?.artistId}>
                    <Review {...artistReviewData} />
                  </S.ReviewWrapper>
                );
              })
            ) : (
              <S.EmptyContainer>
                <S.EmptyWrapper>
                  <S.EmptyTitle>완료한 공연이 없습니다.</S.EmptyTitle>
                  <ConcertEmptyButton>
                    <ButtonWithArrowDark
                      onClick={() => navigate('/performances/register')}
                      text="공연등록"
                    ></ButtonWithArrowDark>
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
