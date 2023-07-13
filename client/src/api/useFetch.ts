import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TEST_HOST = process.env.REACT_APP_TEST_HOST;
const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

interface PerformanceProps {
  id: number;
  title: string;
  date: string;
  price: number;
  leftSeat: number;
  content: string;
  imageUrl: string;
  categoryId: number;
  // totalSeat 임시로 사용
  totalSeat: number;
}

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

export const useTestGetPerformance = (id: string | number | undefined) => {
  if (id === undefined) return;
  const navigate = useNavigate();
  const [data, setData] = useState<PerformanceProps>();

  const getData = async () => {
    await axios
      .get<PerformanceProps>(`${TEST_HOST}/performances/${id}`)
      .then(data => setData(data.data))
      .catch(err => {
        console.log(err);
        // TODO: 정보를 가져오지 못했을 시 Not Found 페이지 표시
        // 비정상적으로 접근한 페이지를 history에 남기지 않기 위해 replace 사용
        navigate('/404', { replace: true });
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return data;
};

export const useTestGetPerformances = () => {
  const [data, setData] = useState<PerformanceProps[]>();

  const getData = async () => {
    await axios
      .get<PerformanceProps[]>(`${TEST_HOST}/performances`, {
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
  const [data, setData] = useState<PerformanceProps>();

  const getData = async () => {
    await axios
      .get<PerformanceProps>(`${TEST_HOST}/performances/${id}`, {
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
