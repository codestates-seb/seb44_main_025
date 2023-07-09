import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name: any, value: any, option: any) => {
  return cookies.set(name, value, { ...option });
};

export const getCookie = (name: any) => {
  return cookies.get(name);
};

export const removeCookie = (name: any, option: any) => {
  return cookies.remove(name, { ...option });
};
