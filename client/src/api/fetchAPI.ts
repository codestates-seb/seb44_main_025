import axios from 'axios';
import { getCookie } from '../utils/Cookie';

const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

// TODO: 임시로 BodyType 사용중인 항목들 타입 정의하기
interface BodyType {
  [x: string]: any;
}

// Performance - POST, PATCH, DELETE
export const postPerformance = async (body: BodyType) => {
  // Promise 상태로 돌려주기
  return axios
    .post(`${SERVER_HOST}/performance`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(data => data.data)
    .catch(err => console.error(err));
};

export const patchPerformance = async (
  performanceId: string | number,
  body: BodyType
) => {
  return await axios
    .patch(
      `${SERVER_HOST}/performance/${performanceId}`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: getCookie('accessToken'),
        },
      }
    )
    .then(data => data.data)
    .catch(err => console.error(err));
};

export const deletePerformance = async (performanceId: string | number) => {
  return await axios
    .delete(`${SERVER_HOST}/performance/${performanceId}`, {
      headers: { Authorization: getCookie('accessToken') },
    })
    .then(response => {
      if (response.status === 204) {
        alert('공연이 삭제되었습니다.');
        return true;
      } else {
        return false;
      }
    })
    .catch(err => console.error(err));
};

// Reservation - GET, POST, DELETE
export const getReservation = async (
  memberId: string | number,
  reservationId: string | number
) => {
  const data = await axios
    .get(`${SERVER_HOST}/reservation/${memberId}/${reservationId}`, {
      headers: {
        Authorization: getCookie('accessToken'),
      },
    })
    .then(data => data)
    .catch(err => console.error(err));

  return data;
};

export const postReservation = async (body: BodyType) => {
  return axios
    .post(`${SERVER_HOST}/reservation`, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('accessToken'),
      },
    })
    .then(data => data)
    .catch(err => console.error(err));
};

export const deleteReservation = async (reservationId: string | number) => {
  const data = await axios
    .delete(`${SERVER_HOST}/reservation/${reservationId}`, {
      headers: {
        Authorization: getCookie('accessToken'),
      },
    })
    .then(data => data)
    .catch(err => console.error(err));

  return data;
};

export const usePostArtist = async (body: BodyType) => {
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
export const usePatchArtist = async (
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

export const usePostArtistImg = async (body: BodyType) => {
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

// Review - POST, PATCH, DELETE
// TODO: 공통 - 함수 호출 후 then 체이닝으로 navigate하기
// POST, PATCH - /review/:performanceId 혹은 모달 닫기 후 새로고침
// DELETE - history -1 혹은 모달 닫기 후 새로고침
export const postReview = async (
  performanceId: string | number,
  body: BodyType
) => {
  return axios
    .post(`${SERVER_HOST}/review`, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('accessToken'),
      },
    })
    .then(data => data)
    .catch(err => console.error(err));
};

export const patchReview = async (
  performanceId: string | number,
  reviewId: string | number,
  body: BodyType
) => {
  return axios
    .patch(
      `${SERVER_HOST}/review/${performanceId}/${reviewId}`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: getCookie('accessToken'),
        },
      }
    )
    .then(data => data)
    .catch(err => console.error(err));
};

export const deleteReview = async (reviewId: string | number) => {
  return axios
    .delete(`${SERVER_HOST}/review/${reviewId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('accessToken'),
      },
    })
    .then(data => data);
};
