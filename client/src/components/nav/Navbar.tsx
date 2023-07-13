import { Styled_Navbar } from './Navbar.styled';
import ArtistIcon from '../../icons/ArtistIcon';
import HomeIcon from '../../icons/HomeIcon';
import InfoIcon from '../../icons/InfoIcon';
import LoginIcon from '../../icons/LoginIcon';
import MypageIcon from '../../icons/MypageIcon';
import { Link } from 'react-router-dom';
import { getCookie } from '../../utils/Cookie';

const Navbar = () => {
  return (
    <Styled_Navbar.Div>
      <Styled_Navbar.Container>
        <Styled_Navbar.Nav>
          <Link to="/">
            <Styled_Navbar.GroupDiv>
              <HomeIcon />
              <Styled_Navbar.Span>홈</Styled_Navbar.Span>
            </Styled_Navbar.GroupDiv>
          </Link>
          <Link to="/performances">
            <Styled_Navbar.GroupDiv>
              <InfoIcon />
              <Styled_Navbar.Span>공연정보</Styled_Navbar.Span>
            </Styled_Navbar.GroupDiv>
          </Link>
          <Link to="/artists">
            <Styled_Navbar.GroupDiv>
              <ArtistIcon />
              <Styled_Navbar.Span>아티스트</Styled_Navbar.Span>
            </Styled_Navbar.GroupDiv>
          </Link>
          {getCookie('token') ? (
            <Link to="/mypage">
              <Styled_Navbar.GroupDiv>
                <MypageIcon />
                <Styled_Navbar.Span>마이페이지</Styled_Navbar.Span>
              </Styled_Navbar.GroupDiv>
            </Link>
          ) : (
            <Link to="/login">
              <Styled_Navbar.GroupDiv>
                <LoginIcon />
                <Styled_Navbar.Span>로그인/회원가입</Styled_Navbar.Span>
              </Styled_Navbar.GroupDiv>
            </Link>
          )}
        </Styled_Navbar.Nav>
      </Styled_Navbar.Container>
    </Styled_Navbar.Div>
  );
};

export default Navbar;
