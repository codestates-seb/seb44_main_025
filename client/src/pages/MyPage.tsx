import { styled } from 'styled-components';
import HeaderLogoST from '../components/header/HeaderLogoST';
import {
  ButtonPrimary75px,
  ButtonWithArrowDark,
} from '../components/buttons/Buttons';
import EditIcon from '../icons/EditIcon';
import Concertpreview from '../components/concert-preview/ConcertPreview';
import ArtistreviewContainer from '../components/artist/artistreviewcontainer';
import Review from '../components/review/Review';
import Footer from '../components/footer/Footer';
import NavMypage from '../components/navs/NavMypage';
import { Link, useNavigate } from 'react-router-dom';
import Img from '.././images/우리사랑이대로.jpeg';
import { removeCookie } from '../utils/Cookie';

export default function Mypage() {
  const navigate = useNavigate();

  /** 로그아웃 및 main으로 페이지 이동 */
  const logoutHandler = () => {
    removeCookie('token');
    alert('[로그아웃 성공] 로그아웃 되었습니다');
    navigate('/');
  };

  return (
    <>
      <HeaderLogoST />
      <S.Main>
        <S.Section>
          <S.Title>마이페이지</S.Title>
          <S.ButtonWarppar>
            <ButtonPrimary75px onClick={logoutHandler}>
              로그아웃
            </ButtonPrimary75px>
          </S.ButtonWarppar>
          <S.ProfileImg src={Img} />
          <S.UserImg src={Img} />
          <S.UserDetail>
            <S.UserNickname>닉네임</S.UserNickname>
            <S.UserEdit>
              <Link to="editmypage">
                <EditIcon />
              </Link>
            </S.UserEdit>
          </S.UserDetail>
          {/* 아티스트 미등록 사용자는 아티스트 등록 버튼 */}
          {/* 아티스트를 등록한 사용자는 아티스트 페이지 버튼 */}
          <S.ButtonWarppar>
            <Link to="artistregist">
              <ButtonWithArrowDark text={'아티스트 등록'}></ButtonWithArrowDark>
            </Link>
            <Link to="artist">
              <ButtonWithArrowDark
                text={'아티스트 페이지'}
              ></ButtonWithArrowDark>
            </Link>
          </S.ButtonWarppar>
          <S.ConcertpreviewContainer>
            <S.SubTitle>예약 중인 공연</S.SubTitle>
            <Concertpreview
              posterImg={''}
              title={''}
              artistname={''}
              category={''}
              price={0}
              date={''}
              categoryId={0}
            />
            <Concertpreview
              posterImg={''}
              title={''}
              artistname={''}
              category={''}
              price={0}
              date={''}
              categoryId={0}
            />
          </S.ConcertpreviewContainer>
          <S.EmptyContainer>
            <S.SubTitle>예약 중인 공연</S.SubTitle>
            <S.EmptyWrapper>
              <S.EmptyTitle>현재 예약중인 공연이 없습니다.</S.EmptyTitle>
              <ConcertEmptyButton>
                <ButtonWithArrowDark text="공연예약"></ButtonWithArrowDark>
              </ConcertEmptyButton>
            </S.EmptyWrapper>
          </S.EmptyContainer>
          <S.SubTitle>내가 관람한 공연</S.SubTitle>
          <ArtistreviewContainer imageUrl={''} />
          <S.EmptyContainer>
            <S.SubTitle>내가 관람한 공연</S.SubTitle>
            <S.EmptyWrapper>
              <S.EmptyTitle>아직 관람한 공연이 없습니다.</S.EmptyTitle>
              <ConcertEmptyButton>
                <ButtonWithArrowDark text="공연예약"></ButtonWithArrowDark>
              </ConcertEmptyButton>
            </S.EmptyWrapper>
          </S.EmptyContainer>
          <S.MyreviewContainer>
            <S.SubTitle>내가 작성한 후기</S.SubTitle>
            <S.ReviewWrapper>
              <Review nickname={''} title={''} content={''} />
              <Review nickname={''} title={''} content={''} />
              <Review nickname={''} title={''} content={''} />
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
