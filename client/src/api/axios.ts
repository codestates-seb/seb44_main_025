import axios from 'axios';

const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

export const instance = axios.create({
  baseURL: `${SERVER_HOST}`,
});

/** 일반 instance와 달리 member 요청 이후 accessToken이 기본 헤더로 설정됩니다. */
export const authInstance = axios.create({
  baseURL: `${SERVER_HOST}`,
});
