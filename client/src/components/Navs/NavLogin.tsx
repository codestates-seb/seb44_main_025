import React, { useState } from "react";
import S from "./Nav.styled";
import ArtistIcon from "../../icons/ArtistIcon";
import HomeIcon from "../../icons/HomeIcon";
import InfoIcon from "../../icons/InfoIcon";
import LoginIcon from "../../icons/LoginIcon";
import { Link } from "react-router-dom";
import MypageIcon from "../../icons/MypageIcon";
const NavLogin = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <S.Div>
      <S.Container>
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
          <Link to="/artists">
            <S.GroupDiv>
              <ArtistIcon />
              <S.Span>아티스트</S.Span>
            </S.GroupDiv>
          </Link>
          {isLogin ? (
            <Link to="/mypage">
              <S.GroupDiv>
                <MypageIcon />
                <S.Span>마이페이지</S.Span>
              </S.GroupDiv>
            </Link>
          ) : (
            <Link to="/login">
              <S.GroupDiv>
                <LoginIcon />
                <S.Span>로그인/회원가입</S.Span>
              </S.GroupDiv>
            </Link>
          )}
        </S.Nav>
      </S.Container>
    </S.Div>
  );
};

export default NavLogin;
