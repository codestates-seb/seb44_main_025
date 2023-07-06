import { useEffect, useState } from 'react';
import MainCarousel from '../components/MainCarousel';
import axios from 'axios';
import styled from 'styled-components';

interface Dummydata {
  title: string;
  artistId: number;
  content: string;
  date: string;
  price: number;
  place: string;
  nickname: string;
  totalSeat: number;
  categoryId: number;
  imageUrl: string;
}

interface ContainerProps {
  translate: string;
  transform: string;
}

const Main = () => {
  let [data, setData] = useState<any[]>([]);
  let [n, setN] = useState(0);
  let [time, setTime] = useState(0.5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/dummy/performancelist.json');
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  /** 캐러셀 슬라이드 좌표 지정하는 함수 */
  function SlideTransitionControl() {
    let num = 0;
    if (n !== -390 * (data.length - 1)) {
      setTime(0.5);
      num = n - 390;
      setN(num);
    } else {
      /** 마지막 슬라이드에서 첫 슬라이드로 */
      // 0.5초동안 슬라이드 넘김
      num = n - 390;
      setN(num);
      // 0.5초 후, 0초동안 첫 번째 슬라이드로 이동(사람 눈엔 보이지 않음)
      setTimeout(function () {
        num = 0;
        setN(num);
        setTime(0);
      }, 500);
    }
    console.log(num);
  }

  return (
    <>
      <S.Something>
        <S.Container
          translate={`translate(${n}px)`}
          transform={`transform ${time}s`}
          className="움직이게"
        >
          {data.length !== 0 && (
            <>
              {/* 슬라이드 리스트 */}
              {data.map((v: Dummydata, i) => {
                return (
                  <div key={i}>
                    <MainCarousel posterImg={v.imageUrl} />
                  </div>
                );
              })}
              {/* 무한 슬라이드를 위해 첫번째 슬라이드 복제 */}
              <MainCarousel posterImg={data[0].imageUrl} />
            </>
          )}
        </S.Container>
      </S.Something>
      <button
        onClick={() => {
          SlideTransitionControl();
        }}
      >
        옆으로넘기기
      </button>
    </>
  );
};

const S = {
  Something: styled.div`
    width: 390px;
    height: 200px;
    overflow: hidden;
  `,
  Container: styled.div<ContainerProps>`
    width: 390px;
    display: flex;
    flex-flow: row;
    /* overflow: hidden; */
    /* transform: translate(-390px); */
    transition: ${props => props.transform};
    transform: ${props => props.translate};
  `,
};

export default Main;
