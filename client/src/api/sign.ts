import axios from 'axios';
import { SignUp, SignIn } from '../model/Member';
import { setCookie } from '../utils/Cookie';

const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

/** 회원가입 api */
export const usePostSignUp = (
  info: SignUp,
  successMessage: string,
  postUrl: string
) => {
  return axios
    .post(`${SERVER_HOST}${postUrl}`, info, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
      if (response.status === 200) {
        alert(successMessage);
        return response.data;
      }
    })
    .catch(error => {
      alert(`error: ${error}`);
      return 'error';
    });
};

/** 로그인 api */
export const usePostSignIn = (info: SignIn, postUrl: string) => {
  return axios
    .post(`${SERVER_HOST}${postUrl}`, info)
    .then(response => {
      // 헤더에 담긴 토큰 가져오기
      const accessToken = response.headers['authorization'];
      if (response.status === 200) {
        // token이 필요한 API 요청 시 header Authorization에 token 담아 전송
        axios.defaults.headers.common['authorization'] = `${accessToken}`;

        // 쿠키 저장
        setCookie(
          'userInfo',
          JSON.stringify({
            memberId: response.data.memberId,
            hasArtist: response.data.hasArtist,
          }),
          { path: '/' }
        );
        setCookie('accessToken', `${accessToken}`, {
          path: '/',
          sameSite: 'strict',
          secure: true,
        });
        setCookie('refreshToken', response.data.refreshToken, {
          path: '/',
          sameSite: 'strict',
          secure: true,
        });

        // 메인페이지로 이동
        alert('[로그인 성공] 메인 페이지로 이동합니다');
        return response.data;
      }
    })
    .catch(() => {
      alert('이메일과 비밀번호를 확인해 주세요');
      return 'error';
    });
};
