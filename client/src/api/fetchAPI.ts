import axios from 'axios';
import { getCookie } from '../utils/Cookie';

const TEST_HOST = process.env.REACT_APP_TEST_HOST;
const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

// TODO: 임시로 BodyType 사용중인 항목들 타입 정의하기
interface BodyType {
  [x: string]: any;
}
export const testPostPerformance = async (body: BodyType) => {
  const data = await axios
    .post(`${TEST_HOST}/performances`, JSON.stringify(body), {
      headers: { 'Content-Type': 'application/json' },
    })
    .then(data => {
      return data;
    })
    .catch(err => console.error(err));

  return data;
};

export const postPerformance = async (body: FormData) => {
  const data = await axios
    .post(`${SERVER_HOST}/performance`, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(data => data.data)
    .catch(err => console.error(err));

  return data;
};

// /${performanceId}

export const postReservation = async (
  performanceId: number,
  body: BodyType
) => {
  const data = await axios
    .post(`${SERVER_HOST}/reservation/${performanceId}`, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('accessToken'),
      },
    })
    .then(data => {
      return data;
    })
    .catch(err => console.error(err));

  return data;
};

export const postArtist = async (body: BodyType) => {
  const data = await axios
    .post(`${SERVER_HOST}/artist`, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('accessToken'),
      },
    })
    .then(data => {
      return data;
    })
    .catch(err => console.error(err));

  return data;
};

/** 아티스트 정보를 수정하는 함수, artistId에 맞게 요청할 수 있도록 id와 수정값을 입력 받음 */
export const patchArtist = async (
  id: string | number | undefined,
  body: BodyType
) => {
  const data = await axios
    .patch(`${SERVER_HOST}/artist/${id}`, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('accessToken'),
      },
    })
    .then(data => {
      return data;
    })
    .catch(err => console.error(err));

  return data;
};

export const postArtistImg = async (body: BodyType) => {
  const data = await axios
    .post(`${SERVER_HOST}/image`, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: getCookie('accessToken'),
      },
    })
    .then(data => {
      return data;
    })
    .catch(err => console.error(err));

  return data;
};

export const testPostReview = async (body: BodyType) => {
  const data = await axios
    .post(`${TEST_HOST}/reviews`, JSON.stringify(body), {
      headers: { 'Content-Type': 'application/json' },
    })
    .then(data => {
      return data;
    })
    .catch(err => console.error(err));

  return data;
};
export const postReview = async (body: BodyType) => {
  const data = await axios
    .post(`${SERVER_HOST}/review`, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(data => {
      return data;
    })
    .catch(err => console.error(err));

  return data;
};
