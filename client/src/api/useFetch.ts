import { PerformanceListType, PerformanceType } from '../model/Performance';
import { ArtistList, Artist } from '../model/Artist';
import { Member, Performance, Review } from '../model/Member';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../utils/Cookie';

const TEST_HOST = process.env.REACT_APP_TEST_HOST;
const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

export const useGetMain = () => {
  const [data, setData] = useState<any>();

  const getData = async () => {
    await axios
      .get<any>(`${TEST_HOST}`, {
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

export const useGetPerformance = (id: string | number | undefined) => {
  if (id === undefined) return;
  const navigate = useNavigate();
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

export const useTestGetPerformances = () => {
  const [data, setData] = useState<PerformanceListType>();

  const getData = async () => {
    await axios
      .get<PerformanceListType>(`${SERVER_HOST}/performance?page=1&size=10`, {
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

export const useGetArtists = () => {
  const [data, setData] = useState<ArtistList>();

  const getData = async () => {
    await axios
      .get<ArtistList>(`${SERVER_HOST}/artist?category=1&page=1&size=10`, {
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
      .then(data => setData(data.data))
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getData();
  }, []);

  return data;
};

export const useGetMemberPerformance = (id: string | number | undefined) => {
  const [data, setData] = useState<Performance>();

  const getData = async () => {
    await axios
      // 공연받아오는 endpoint에 맞게 수정해주기
      .get<Performance>(`${SERVER_HOST}/member/${id}`, {
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

export const useGetMemberReview = (id: string | number | undefined) => {
  const [data, setData] = useState<Review>();

  const getData = async () => {
    await axios
      // 공연받아오는 endpoint에 맞게 수정해주기
      .get<Review>(`${SERVER_HOST}/member/${id}`, {
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
