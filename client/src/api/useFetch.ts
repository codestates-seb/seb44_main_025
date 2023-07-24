import { PerformanceListType, PerformanceType } from '../model/Performance';
import { ArtistList, Artist, ArtistReview } from '../model/Artist';
import { Member, Review } from '../model/Member';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie, removeCookie, setCookie } from '../utils/Cookie';
import { useUserInfo } from '../zustand/userInfo.stores';
import { ReservationType } from '../model/Reservation';

const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

export const useGetPerformance = (id: string | number | undefined) => {
  const [data, setData] = useState<PerformanceType>();

  const getData = async () => {
    if (!id) return;
    await axios
      .get<{ data: PerformanceType }>(`${SERVER_HOST}/performance/${id}`)
      .then(response => response.data)
      .then(data => setData(data?.data))
      .catch(err => {
        console.log(err);
        // TODO: 정보를 가져오지 못했을 시 Not Found 페이지 표시
        // 비정상적으로 접근한 페이지를 history에 남기지 않기 위해 replace 사용
        // navigate('/404', { replace: true });
      });
  };
  useEffect(() => {
    getData();
  }, [id]);
  return data;
};

export const useGetPerformances = (
  categoryId?: number | string | null,
  isStale?: boolean | null,
  page?: number | string | null,
  size?: number | string | null
) => {
  const [data, setData] = useState<PerformanceListType>();

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios
      .get<PerformanceListType>(
        `${SERVER_HOST}/performance${
          categoryId ? `/category/${categoryId}` : ''
        }?page=${page || 1}&size=${size || 5}&performanceStatus=${
          isStale ? '공연완료' : isStale === false ? '공연진행중' : ''
        }`,
        {
          cancelToken: source.token,
        }
      )
      .then(data => setData(data.data))
      .catch(err => {
        if (err.code === 'ERR_CANCELED') return;
        console.log(err);
      });

    return () => source.cancel('요청 취소');
  }, [categoryId, isStale, page, size]);

  return data;
};

export const useGetArtists = (
  categoryId?: string | number | null,
  page?: number | string | null,
  size?: number | string | null
) => {
  const [data, setData] = useState<ArtistList>();

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios
      .get<ArtistList>(
        categoryId
          ? `${SERVER_HOST}/artist?page=${page || 1}&size=${
              size || 10
            }&category=${categoryId}`
          : `${SERVER_HOST}/artist/all`,
        {
          cancelToken: source.token,
        }
      )
      .then(data => setData(data.data))
      .catch(err => {
        if (err.code === 'ERR_CANCELED') return;
        console.log(err);
      });

    return () => {
      source.cancel('요청 취소');
    };
  }, [categoryId, page, size]);

  return data;
};

/** 아티스트 정보를 받아오는 get함수, 아티스트 정보를 받은 후 zustand에 정보를 담아서 상태 관리(수정페이지의 input defaultValue로 넣기 위함) */
export const useGetArtist = (id: string | number | undefined) => {
  const [data, setData] = useState<Artist>();

  const getData = async () => {
    await axios
      .get<Artist>(`${SERVER_HOST}/artist/${id}`)
      .then(data => {
        return setData(data.data);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getData();
  }, []);

  return data;
};

export const useGetArtistPerfomance = (id: string | number | undefined) => {
  const [data, setData] = useState<PerformanceListType>();

  const getData = async () => {
    await axios
      .get<PerformanceListType>(
        `${SERVER_HOST}/performance${
          id ? `/artist/${id}` : ''
        }?page=1&size=5&performanceStatus=공연진행중`
      )
      .then(data => {
        setData(data.data);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getData();
  }, []);

  return data;
};

export const useGetArtistPerfomanced = (id: string | number | undefined) => {
  const [data, setData] = useState<PerformanceListType>();

  const getData = async () => {
    await axios
      .get<PerformanceListType>(
        `${SERVER_HOST}/performance${
          id ? `/artist/${id}` : ''
        }?page=1&size=5&performanceStatus=공연완료`
      )
      .then(data => setData(data.data))
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getData();
  }, []);

  return data;
};

export const useGetArtistReview = (id: string | number | undefined) => {
  const [data, setData] = useState<ArtistReview[]>();

  const getData = async () => {
    await axios
      .get<ArtistReview[]>(`${SERVER_HOST}/review/artistPage/${id}`)
      .then(data => setData(data.data))
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getData();
  }, []);

  return data;
};

export const useGetMember = () => {
  const [data, setData] = useState<Member>();
  const { setUserInfo } = useUserInfo();

  const getData = async () => {
    await axios
      .get<Member>(`${SERVER_HOST}/member`, {
        headers: {
          Authorization: getCookie('accessToken'),
        },
      })
      .then(data => {
        setData(data.data), removeCookie('userInfo');
        setUserInfo({
          memberId: data.data.memberId,
          hasArtist: data.data.hasArtist,
          artistId: data.data.artistId,
        });
        setCookie(
          'userInfo',
          JSON.stringify({
            memberId: data.data.memberId,
            hasArtist: data.data.hasArtist,
            artistId: data.data.artistId,
          }),
          { path: '/' }
        );
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getData();
  }, []);
  return data;
};

export const useGetMemberPerformance = () => {
  const [data, setData] = useState<ReservationType[]>();

  const getData = async () => {
    await axios
      // 공연받아오는 endpoint에 맞게 수정해주기
      .get<ReservationType[]>(
        `${SERVER_HOST}/reservation/mypage?performanceStatus=공연진행중`,
        {
          headers: {
            Authorization: getCookie('accessToken'),
          },
        }
      )
      .then(data => setData(data.data))
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getData();
  }, []);
  return data;
};
// 주소 수정해야함
export const useGetMemberPerformanced = () => {
  const [data, setData] = useState<ReservationType[]>();

  const getData = async () => {
    await axios
      // 공연받아오는 endpoint에 맞게 수정해주기
      .get<ReservationType[]>(
        `${SERVER_HOST}/reservation/mypage?performanceStatus=공연완료`,
        {
          headers: {
            Authorization: getCookie('accessToken'),
          },
        }
      )
      .then(data => setData(data.data))
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getData();
  }, []);

  return data;
};

export const useGetMemberReview = () => {
  const [data, setData] = useState<Review[]>();

  const getData = async () => {
    await axios
      // 공연받아오는 endpoint에 맞게 수정해주기
      .get<Review[]>(`${SERVER_HOST}/review/mypage`, {
        headers: {
          Authorization: getCookie('accessToken'),
        },
      })
      .then(data => setData(data.data))
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getData();
  }, []);

  return data;
};

export const useGetReview = (id: string | number | undefined) => {
  const [data, setData] = useState<Review>();

  const getData = async () => {
    await axios
      .get<Review>(`${SERVER_HOST}/review/${id}`)
      .then(data => setData(data.data))
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getData();
  }, []);

  return data;
};
