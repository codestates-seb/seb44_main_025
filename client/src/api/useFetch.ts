import {
  PerformanceListType,
  PerformanceType,
  ArtistPagePerformance,
} from '../model/Performance';
import { ArtistList, Artist, ArtistReview } from '../model/Artist';
import { Member, Performance, Review } from '../model/Member';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie, removeCookie, setCookie } from '../utils/Cookie';

const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

export const useGetPerformance = (id: string | number | undefined) => {
  if (id === undefined) return;
  const [data, setData] = useState<PerformanceType>();

  const getData = async () => {
    await axios
      .get<{ data: PerformanceType }>(`${SERVER_HOST}/performance/${id}`, {
        headers: { 'ngrok-skip-browser-warning': true },
      })
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
  }, []);

  return data;
};

export const useGetPerformances = (
  categoryId?: number | null,
  isStale?: boolean | null
) => {
  const [data, setData] = useState<PerformanceListType>();

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios
      .get<PerformanceListType>(
        `${SERVER_HOST}/performance${
          categoryId ? `/category/${categoryId}` : ''
        }?page=1&size=10&performanceStatus=${
          isStale ? '공연완료' : isStale === false ? '공연중' : ''
        }`,
        {
          headers: { 'ngrok-skip-browser-warning': true },
          cancelToken: source.token,
        }
      )
      .then(data => setData(data.data))
      .catch(err => {
        if (err.code === 'ERR_CANCELED') return;
        console.log(err);
      });

    return () => source.cancel('요청 취소');
  }, [categoryId, isStale]);

  return data;
};

export const useGetArtists = (categoryId?: number | null) => {
  const [data, setData] = useState<ArtistList>();

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios
      .get<ArtistList>(
        `${SERVER_HOST}/artist?page=1&size=10&category=${
          categoryId ? categoryId : '1'
        }`,
        {
          headers: { 'ngrok-skip-browser-warning': true },
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
  }, [categoryId]);

  return data;
};

export const useGetArtist = (id: string | number | undefined) => {
  const [data, setData] = useState<Artist>();

  const getData = async () => {
    await axios
      .get<Artist>(`${SERVER_HOST}/artist/${id}`, {
        headers: { 'ngrok-skip-browser-warning': true },
      })
      .then(data => setData(data.data))
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getData();
  }, []);

  return data;
};

export const useGetArtistPerfomance = (
  id: string | number | undefined,
  categoryId?: number
) => {
  const [data, setData] = useState<ArtistPagePerformance[]>();

  const getData = async () => {
    await axios
      .get<ArtistPagePerformance[]>(
        `${SERVER_HOST}/performance${
          id ? `/artist/${id}` : ''
        }?page=1&size=5&performanceStatus=공연중`,
        {
          headers: { 'ngrok-skip-browser-warning': true },
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

export const useGetArtistPerfomanced = (id: string | number | undefined) => {
  const [data, setData] = useState<ArtistPagePerformance[]>();

  const getData = async () => {
    await axios
      .get<ArtistPagePerformance[]>(
        `${SERVER_HOST}/performance${
          id ? `/artist/${id}` : ''
        }?page=1&size=5&performanceStatus=공연완료`,
        {
          headers: { 'ngrok-skip-browser-warning': true },
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

export const useGetArtistReview = (id: string | number | undefined) => {
  const [data, setData] = useState<ArtistReview[]>();

  const getData = async () => {
    await axios
      .get<ArtistReview[]>(`${SERVER_HOST}/review/${id}`, {
        headers: { 'ngrok-skip-browser-warning': true },
      })
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

  const getData = async () => {
    await axios
      .get<Member>(`${SERVER_HOST}/member`, {
        headers: {
          Authorization: getCookie('accessToken'),
          'ngrok-skip-browser-warning': true,
        },
      })
      .then(data => {
        setData(data.data), removeCookie('userInfo');
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

export const useGetMemberPerformance = (id: string | number | undefined) => {
  const [data, setData] = useState<Performance[]>();

  const getData = async () => {
    await axios
      // 공연받아오는 endpoint에 맞게 수정해주기
      .get<Performance[]>(
        `${SERVER_HOST}/member/${id}/page=1&size=5&performanceStatus=공연중`,
        {
          headers: { 'ngrok-skip-browser-warning': true },
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

export const useGetMemberPerformanced = (id: string | number | undefined) => {
  const [data, setData] = useState<Performance[]>();

  const getData = async () => {
    await axios
      // 공연받아오는 endpoint에 맞게 수정해주기
      .get<Performance[]>(
        `${SERVER_HOST}/member/${id}/page=1&size=5&performanceStatus=공연완료`,
        {
          headers: { 'ngrok-skip-browser-warning': true },
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

export const useGetMemberReview = (id: string | number | undefined) => {
  const [data, setData] = useState<Review[]>();

  const getData = async () => {
    await axios
      // 공연받아오는 endpoint에 맞게 수정해주기
      .get<Review[]>(`${SERVER_HOST}/review/${id}`, {
        headers: { 'ngrok-skip-browser-warning': true },
      })
      .then(data => setData(data.data))
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getData();
  }, []);

  return data;
};
