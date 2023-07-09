import { Cookies } from 'react-cookie';

interface Set {
  name: any;
  value: any;
  option: any;
}
interface Get {
  name: any;
}
interface Remove {
  name: any;
  option: any;
}

const cookies = new Cookies();

export const setCookie = ({ name, value, option }: Set) => {
  return cookies.set(name, value, { ...option });
};

export const getCookie = ({ name }: Get) => {
  return cookies.get(name);
};

export const removeCookie = ({ name, option }: Remove) => {
  return cookies.remove(name, { ...option });
};
