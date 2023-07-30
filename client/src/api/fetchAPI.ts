import { getCookie } from '../utils/Cookie';
import { Member } from '../model/Member';
import { authInstance, instance } from './axios';

// TODO: 임시로 BodyType 사용중인 항목들 타입 정의하기
interface BodyType {
  [x: string]: any;
}

// Note: getMember는 다시 접속했을 때에도 요청을 보내야 하므로 쿠키 활용
export const getMember = async () => {
  return await instance
    .get<Member>('/member', {
      headers: {
        Authorization: getCookie('accessToken'),
      },
    })
    .then(data => data.data)
    .catch(err => console.log(err));
};

// Performance - POST, PATCH, DELETE
export const postPerformance = async (body: BodyType) => {
  // Promise 상태로 돌려주기
  return authInstance
    .post('/performance', body, {
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
  return await authInstance
    .patch(`/performance/${performanceId}`, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(data => data.data)
    .catch(err => console.error(err));
};

export const deletePerformance = async (performanceId: string | number) => {
  return await authInstance
    .delete(`/performance/${performanceId}`)
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
  const data = await authInstance
    .get(`/reservation/${memberId}/${reservationId}`)
    .then(data => data)
    .catch(err => console.error(err));

  return data;
};

export const postReservation = async (body: BodyType) => {
  return authInstance
    .post('/reservation', JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(data => data)
    .catch(err => console.error(err));
};

export const deleteReservation = async (reservationId: string | number) => {
  const data = await authInstance
    .delete(`/reservation/${reservationId}`)
    .then(data => data)
    .catch(err => console.error(err));

  return data;
};

export const usePostArtist = async (body: BodyType) => {
  const data = await authInstance
    .post('/artist', JSON.stringify(body), {
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

/** 아티스트 정보를 수정하는 함수, artistId에 맞게 요청할 수 있도록 id와 수정값을 입력 받음 */
export const usePatchArtist = async (
  id: string | number | undefined,
  body: BodyType
) => {
  const data = await authInstance
    .patch(`/artist/${id}`, JSON.stringify(body), {
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

export const usePostArtistImg = async (body: BodyType) => {
  const data = await instance
    .post('/image', body, {
      headers: {
        'Content-Type': 'multipart/form-data',
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
  return instance
    .post('/review', JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json',
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
  return instance
    .patch(`/review/${performanceId}/${reviewId}`, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('accessToken'),
      },
    })
    .then(data => data)
    .catch(err => console.error(err));
};

export const deleteReview = async (reviewId: string | number) => {
  return instance
    .delete(`/review/${reviewId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('accessToken'),
      },
    })
    .then(data => data);
};
