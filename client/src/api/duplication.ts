import axios from 'axios';

const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

/** 이메일 중복검사하는 함수 */
export const useGetDuplicateEmail = (email: string | null) => {
  return axios.post(`${SERVER_HOST}/member/duplicate/email`, { email: email });
};

/** 닉네임 중복검사하는 함수 */
export const useGetDuplicateNickname = (nickname: string | null) => {
  return axios.post(`${SERVER_HOST}/member/duplicate/nickname`, {
    nickname: nickname,
  });
};
