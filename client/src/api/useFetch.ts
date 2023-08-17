import { PerformanceListType, PerformanceType } from '../model/Performance';
import { ArtistList, Artist } from '../model/Artist';
import { Member, Review } from '../model/Member';
import { useEffect, useState } from 'react';
import axios, { CancelToken } from 'axios';
import { getCookie, removeCookie, setCookie } from '../utils/Cookie';
import { useUserInfo } from '../zustand/userInfo.stores';
import { ReservationType } from '../model/Reservation';
import { useNavigate } from 'react-router-dom';
import { authInstance, instance } from './axios';
import { PageInfo } from '../model/Common';

export const useGetPerformance = (id: string | number | undefined) => {
  const [data, setData] = useState<PerformanceType>();

  const getData = async () => {
    if (!id) return;
    await instance
      .get<{ data: PerformanceType }>(`/performance/${id}`)
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
): [pageInfo: PageInfo | undefined, data: PerformanceType[]] => {
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const [data, setData] = useState<PerformanceType[]>([]);
  const fetchData = (token: CancelToken) => {
    instance
      .get<PerformanceListType>(
        `/performance${categoryId ? `/category/${categoryId}` : ''}?page=${
          page || 1
        }&size=${size || 100}&performanceStatus=${
          isStale ? '공연완료' : isStale === false ? '공연진행중' : ''
        }`,
        {
          cancelToken: token,
        }
      )
      .then(res => {
        setData(prev => [...prev, ...res.data.data]);
        setPageInfo(res.data.pageInfo);
        return true;
      })
      .catch(err => {
        // 토큰에 의하여 요청이 취소된 경우에는 console에 메시지 출력하지 않음
        if (err.code === 'ERR_CANCELED') return;
        console.error(err);
      });
  };

  // page가 2 이상일 때에만 해당 로직을 통해 data를 갱신합니다.
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    if (+(page ?? 0) > 1) {
      fetchData(source.token);
    }
    return () => {
      source.cancel('요청 취소');
    };
  }, [page]);

  // categoryId, isStale, size가 변경되었을 시, 기존의 data를 초기화하고 새롭게 data를 구성합니다.
  // 함수를 호출하기 이전에 categoryId, isStale, size 변경 시 동시에 setPage(1)을 호출하여 page가 1이 될 수 있도록 해야 합니다.
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    setData(() => []);
    fetchData(source.token);
    return () => {
      source.cancel('요청 취소');
    };
  }, [categoryId, isStale, size]);

  return [pageInfo, data];
};

export const useGetArtists = (
  categoryId?: string | number | null,
  page?: number | string | null,
  size?: number | string | null
): [pageInfo: PageInfo | undefined, data: Artist[]] => {
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const [data, setData] = useState<Artist[]>([]);

  // category를 포함한 요청, 포함하지 않은 요청 API 요청 엔드포인트 및 응답 자체가 다르므로 분리
  // category를 포함하지 않은 요청
  const fetchDataWithoutCategory = (token: CancelToken) => {
    instance
      .get<Artist[]>('/artist/all', {
        cancelToken: token,
      })
      .then(res => {
        setData(res.data.reverse());
      })
      .catch(err => {
        if (err.code === 'ERR_CANCELED') return;
        console.log(err);
      });
  };

  // category를 포함한 요청
  const fetchDataWithCategory = (token: CancelToken) => {
    instance
      .get<ArtistList>(
        `/artist?page=${page || 1}&size=${size || 10}&category=${categoryId}`,
        {
          cancelToken: token,
        }
      )
      .then(res => {
        setPageInfo(res.data.pageInfo);
        setData(prev => [...prev, ...res.data.data]);
      })
      .catch(err => {
        if (err.code === 'ERR_CANCELED') return;
        console.log(err);
      });
  };

  // page 변경 시 실행되는 effect
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    if (+(page ?? 0) > 1) {
      fetchDataWithCategory(source.token);
    }
    return () => {
      source.cancel('요청 취소');
    };
  }, [page]);

  // category, size 변경 시 실행되는 effect
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    if (categoryId === null) {
      fetchDataWithoutCategory(source.token);
      setPageInfo(undefined);
    } else {
      setData(() => []);
      fetchDataWithCategory(source.token);
    }
    return () => {
      source.cancel('요청 취소');
    };
  }, [categoryId, size]);

  return [pageInfo, data];
};

/** 아티스트 정보를 받아오는 get함수, 아티스트 정보를 받은 후 zustand에 정보를 담아서 상태 관리(수정페이지의 input defaultValue로 넣기 위함) */
export const useGetArtist = (id: string | number | undefined) => {
  const [data, setData] = useState<Artist>();
  const navigate = useNavigate();

  const getData = async () => {
    await instance
      .get<Artist>(`/artist/${id}`)
      .then(data => {
        return setData(data.data);
      })
      .catch(err => {
        console.log(err);
        alert('아티스트 정보를 불러오지 못했습니다.');
        navigate('/artists', { replace: true });
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return data;
};

export const useGetArtistPerfomance = (id: string | number | undefined) => {
  const [data, setData] = useState<PerformanceListType>();

  const getData = async () => {
    await instance
      .get<PerformanceListType>(
        `/performance${
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
    await instance
      .get<PerformanceListType>(
        `/performance${
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
  const [data, setData] = useState<Review[]>();

  const getData = async () => {
    await instance
      .get<Review[]>(`/review/artistPage/${id}`)
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
    await instance
      .get<Member>('/member', {
        headers: { Authorization: getCookie('accessToken') },
      })
      .then(data => {
        authInstance.defaults.headers.common['Authorization'] =
          getCookie('accessToken');
        setData(data.data);
        removeCookie('userInfo');
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

export const useGetReservations = () => {
  const [data, setData] = useState<ReservationType[]>();

  const getData = async () => {
    await authInstance
      // 공연받아오는 endpoint에 맞게 수정해주기
      .get<ReservationType[]>('/reservation/mypage')
      .then(data => setData(data.data))
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
    await authInstance
      // 공연받아오는 endpoint에 맞게 수정해주기
      .get<ReservationType[]>(
        '/reservation/mypage?performanceStatus=공연진행중'
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
    await authInstance
      // 공연받아오는 endpoint에 맞게 수정해주기
      .get<ReservationType[]>('/reservation/mypage?performanceStatus=공연완료')
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
    await authInstance
      .get<Review[]>('/review/mypage')
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
    await instance
      .get<Review>(`/review/${id}`)
      .then(data => setData(data.data))
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getData();
  }, []);

  return data;
};
