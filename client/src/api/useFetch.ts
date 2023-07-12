import { useEffect, useState } from 'react';
import axios from 'axios';

const TEST_HOST = process.env.REACT_APP_TEST_HOST;
const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

interface PerformanceProps {
  id: number;
  title: string;
  date: string;
  price: number;
  leftseat: number;
}

const useGetMain = () => {
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
    console.log(data);
  }, []);

  return data;
};

const useGetPerformance = ({ id }: { id: number }) => {
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

export { useGetMain, useGetPerformance };
