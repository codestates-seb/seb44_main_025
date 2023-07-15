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
          <Styled_Navbar.AnimationDiv>
            <Link to="/" style={{ textDecorationLine: 'none' }}>
              <Styled_Navbar.IconAndTextDiv>
                <HomeIcon />
                <Styled_Navbar.TextSpan>홈</Styled_Navbar.TextSpan>
              </Styled_Navbar.IconAndTextDiv>
            </Link>
          </Styled_Navbar.AnimationDiv>
          <Styled_Navbar.AnimationDiv>
            <Link to="/performances" style={{ textDecorationLine: 'none' }}>
              <Styled_Navbar.IconAndTextDiv>
                <InfoIcon />
                <Styled_Navbar.TextSpan>공연정보</Styled_Navbar.TextSpan>
              </Styled_Navbar.IconAndTextDiv>
            </Link>
          </Styled_Navbar.AnimationDiv>
          <Styled_Navbar.AnimationDiv>
            <Link to="/artists" style={{ textDecorationLine: 'none' }}>
              <Styled_Navbar.IconAndTextDiv>
                <ArtistIcon />
                <Styled_Navbar.TextSpan>아티스트</Styled_Navbar.TextSpan>
              </Styled_Navbar.IconAndTextDiv>
            </Link>
          </Styled_Navbar.AnimationDiv>
          {getCookie('accessToken') ? (
            <Styled_Navbar.AnimationDiv>
              <Link to={`/mypage/${getCookie('userInfo').memberId}`}>
                <Styled_Navbar.IconAndTextDiv>
                  <MypageIcon />
                  <Styled_Navbar.TextSpan>마이페이지</Styled_Navbar.TextSpan>
                </Styled_Navbar.IconAndTextDiv>
              </Link>
            </Styled_Navbar.AnimationDiv>
          ) : (
            <Styled_Navbar.AnimationDiv>
              <Link to="/login" style={{ textDecorationLine: 'none' }}>
                <Styled_Navbar.IconAndTextDiv>
                  <LoginIcon />
                  <Styled_Navbar.TextSpan>
                    로그인/회원가입
                  </Styled_Navbar.TextSpan>
                </Styled_Navbar.IconAndTextDiv>
              </Link>
            </Styled_Navbar.AnimationDiv>
          )}
        </Styled_Navbar.Nav>
      </Styled_Navbar.Container>
    </Styled_Navbar.Div>
  );
};

export default Navbar;
