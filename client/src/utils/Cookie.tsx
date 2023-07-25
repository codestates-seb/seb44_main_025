import { Cookies } from 'react-cookie';

const cookies = new Cookies();

/** 로그인시 쿠키에 토큰 저장할 때 사용 */
export const setCookie = (name: string, value: string, option: any) => {
  return cookies.set(name, value, { ...option });
};

/** 쿠키를 가지고 있는지 여부 확인(로그인되어있는지) */
export const getCookie = (name: string) => {
  return cookies.get(name);
};

/** 쿠키 삭제할 때 사용(ex로그아웃) */
export const removeCookie = (name: string, option?: any) => {
  return cookies.remove(name, { ...option });
};
