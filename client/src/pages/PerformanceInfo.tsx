import { styled } from 'styled-components';
import HeaderOnlyP from '../components/Header/HeaderOnlyP';
import {
  ButtonMini,
  ButtonPrimary160px,
  ButtonPrimary335px,
} from '../components/Buttons/Buttons';
import ArtistContainer from '../components/artist/artistcontainer';
import Review from '../components/review/review';
import NavLogin from '../components/Navs/NavLogin';
import NavMypage from '../components/Navs/NavMypage';
import { useNavigate } from 'react-router-dom';

const S = {
  Heading3: styled.h3`
    margin-top: 20px;
    margin-bottom: 8px;
    margin-right: auto;
    margin-left: 15px;
    color: white;
    font-size: var(--heading3-font-size);
    font-weight: var(--heading3-font-weight);
    line-height: var(--heading3-line-height);
  `,
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1e1e1e;
  `,
  Main: styled.main`
    width: 390px;
    min-height: calc(100vh - 50px);
    background-color: var(--theme-background-color);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 70px;
  `,
  CategoryContainer: styled.div`
    margin-top: 20px;
    display: flex;
    min-width: 360px;
    justify-content: flex-start;
    & > button:not(:first-child) {
      margin-left: 13px;
    }
  `,
  ButtonContainer: styled.div`
    margin-top: 12px;
    display: flex;
    min-width: 360px;
    justify-content: space-between;
  `,
  SummaryContainer: styled.div`
    margin-top: 12px;
    width: 360px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  Poster: styled.div`
    width: 170px;
    height: 210px;
    background-color: gray;
  `,
  // align-items: flex-start 왼쪽 정렬, flex-end 오른쪽 정렬
  Summary: styled.div`
    width: 170px;
    height: 210px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    & p {
      color: white;
      font-size: var(--p-small-medium-font-size);
      font-weight: var(--p-small-medium-font-weight);
      line-height: var(--p-small-medium-line-height);
    }
  `,
  TextContainer: styled.div`
    width: 360px;
    color: white;
    font-size: var(--p-small-medium-font-size);
    font-weight: var(--p-small-medium-font-weight);
    line-height: var(--p-small-medium-line-height);
  `,
  Map: styled.div`
    width: 360px;
    height: 200px;
    background-color: gray;
  `,
  ReviewContainer: styled.div`
    width: 360px;
    & div {
      margin: 0px 0px 8px 0px;
    }
    margin-bottom: 12px;
  `,
  BottomStickyContainer: styled.div`
    width: 390px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: auto;
    bottom: 70px;
    & button {
      z-index: 1;
    }
  `,
};

// TODO: props로 렌더링하기
const PerformanceInfo = () => {
  const navigate = useNavigate();
  // TODO: 로그인 상태관리 로직 추가하기
  const isLoggedIn = true;
  // TODO: 공연 일자 경과 여부 로직 추가하기
  const isStale = true;
  return (
    <>
      <HeaderOnlyP />
      <S.Container>
        <S.Main>
          <S.CategoryContainer>
            {/* TODO: 해당되는 카테고리만 보여주기*/}
            <ButtonMini>팝</ButtonMini>
            <ButtonMini>락</ButtonMini>
            <ButtonMini>R&B</ButtonMini>
            <ButtonMini>힙합</ButtonMini>
            <ButtonMini>재즈</ButtonMini>
            <ButtonMini>밴드</ButtonMini>
            <ButtonMini>댄스</ButtonMini>
          </S.CategoryContainer>
          <S.ButtonContainer>
            {/* TODO: 공연 일정 이후 && 공연 관람한 유저에게만 보여주기 */}
            <ButtonPrimary160px onClick={() => navigate('/reviews/post')}>
              공연 후기 작성
            </ButtonPrimary160px>
            {/* TODO: 공연 일정 이전 && 공연을 등록한 유저에게만 보여주기 */}
            <ButtonPrimary160px
              onClick={() => navigate('/performances/register')}
            >
              공연 정보 수정하기
            </ButtonPrimary160px>
          </S.ButtonContainer>
          <S.SummaryContainer>
            <S.Poster></S.Poster>
            <S.Summary>
              <p>공연명</p>
              <p>공연명</p>
              <p>날짜</p>
              <p>2023년 8월 3일</p>
              <p>금액</p>
              <p>10,000원</p>
              <p>남은 좌석 수</p>
              <p>30석</p>
            </S.Summary>
          </S.SummaryContainer>
          <S.Heading3>공연설명</S.Heading3>
          <S.TextContainer>
            ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
          </S.TextContainer>
          <S.Heading3>공연장 위치</S.Heading3>
          <S.Map></S.Map>
          <S.Heading3>아티스트 정보</S.Heading3>
          <ArtistContainer />
          <S.Heading3>후기</S.Heading3>
          <S.ReviewContainer>
            <Review />
            <Review />
          </S.ReviewContainer>
          <S.BottomStickyContainer>
            {/* TODO: 공연 일정과 현재 시각 비교 -> 예약하기 / 후기등록 조건부 렌더링 */}
            {/* TODO: 현재 좌석수 > 0 ? 예약 버튼 활성화 : 예약 버튼 비활성화 */}
            <ButtonPrimary335px
              onClick={() =>
                isStale &&
                (isLoggedIn ? navigate('/reviews/post') : navigate('/login'))
              }
            >
              {isStale ? '후기 작성' : '예약하기'}
            </ButtonPrimary335px>
          </S.BottomStickyContainer>
        </S.Main>
      </S.Container>
      {isLoggedIn ? <NavMypage /> : <NavLogin />}
    </>
  );
};

export default PerformanceInfo;
