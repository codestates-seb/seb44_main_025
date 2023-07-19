import axios from 'axios';

const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

/** 닉네임 중복검사하는 함수 */
export const useGetDuplicateNickname = (nickname: string | null) => {
  const data = axios.post(`${SERVER_HOST}/member/duplicate/nickname`, {
    nickname: nickname,
  });
  return data;
};
