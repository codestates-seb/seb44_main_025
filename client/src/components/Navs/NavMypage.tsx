import S from './Nav.styled';
import ArtistIcon from '../../icons/ArtistIcon';
import HomeIcon from '../../icons/HomeIcon';
import InfoIcon from '../../icons/InfoIcon';
import MypageIcon from '../../icons/MypageIcon';
import { Link } from 'react-router-dom';

const NavMypage = () => {
  return (
    <S.Body>
      <S.Nav>
        <Link to="/">
          <S.GroupDiv>
            <HomeIcon />
            <S.Span>홈</S.Span>
          </S.GroupDiv>
        </Link>
        <Link to="/performances">
          <S.GroupDiv>
            <InfoIcon />
            <S.Span>공연정보</S.Span>
          </S.GroupDiv>
        </Link>
        <Link to="">
          <S.GroupDiv>
            <ArtistIcon />
            <S.Span>아티스트</S.Span>
          </S.GroupDiv>
        </Link>
        <Link to="/mypage">
          <S.GroupDiv>
            <MypageIcon />
            <S.Span>마이페이지</S.Span>
          </S.GroupDiv>
        </Link>
      </S.Nav>
    </S.Body>
  );
};

export default NavMypage;
