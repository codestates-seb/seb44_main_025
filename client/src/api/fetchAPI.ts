import axios from 'axios';

const TEST_HOST = process.env.REACT_APP_TEST_HOST;
const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

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
    .post(`${SERVER_HOST}/performance/register`, body, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(data => {
      return data;
    })
    .catch(err => console.error(err));

  return data;
};

interface bodyType {
  [x: string]: any;
}

export const postReservation = async (
  performanceId: number,
  body: bodyType
) => {
  const data = await axios
    .post(`${SERVER_HOST}/reservation`, JSON.stringify(body), {
      headers: { 'Content-Type': 'application/json' },
    })
    .then(data => {
      return data;
    })
    .catch(err => console.error(err));

  return data;
};

export const postArtist = async (body: bodyType) => {
  const data = await axios
    .post(`${SERVER_HOST}/artist`, JSON.stringify(body), {
      headers: { 'Content-Type': 'application/json' },
    })
    .then(data => {
      return data;
    })
    .catch(err => console.error(err));

  return data;
};

export const testPostReview = async (body: bodyType) => {
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
