import { useEffect, useState } from 'react';
import { CarouselList } from '../../zustand/mainapi';
import CarouselSlide from './CarouselSlide';
import { Styled_CarouselLogicStyled } from './CarouselLogic.styled';

interface CarouselItemType {
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

const Main = () => {
  let [movementWidth, setMovementWidth] = useState(0);
  let [time, setTime] = useState(0.5);
  const { carouselData } = CarouselList();

  /** 캐러셀 3초마다 동작 */
  useEffect(() => {
    const interval = setInterval(() => {
      SlideTransitionControl();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [movementWidth]);

  /** 캐러셀 슬라이드 좌표 지정하는 함수 */
  function SlideTransitionControl() {
    let num = 0;
    // 마지막 슬라이드가 아닌 경우
    if (movementWidth !== -390 * (carouselData.length - 1)) {
      setTime(0.5);
      num = movementWidth - 390;
      setMovementWidth(num);
    }
    // 마지막 슬라이드인 경우
    else {
      /** 마지막 슬라이드에서 첫 슬라이드로 */
      // 0.5초동안 슬라이드 넘김
      num = movementWidth - 390;
      setMovementWidth(num);
      // 0.5초 후, 0초동안 첫 번째 슬라이드로 이동(사람 눈엔 보이지 않음)
      setTimeout(function () {
        num = 0;
        setMovementWidth(num);
        setTime(0);
      }, 500);
    }
  }

  return (
    <>
      <Styled_CarouselLogicStyled.Div>
        <Styled_CarouselLogicStyled.Container
          translate={`translate(${movementWidth}px)`}
          transform={`transform ${time}s`}
        >
          {carouselData.length !== 0 && (
            <>
              {/* 슬라이드 리스트 */}
              {carouselData.map((v: CarouselItemType, i) => {
                return (
                  <div key={i}>
                    <CarouselSlide
                      posterImg={v.imageUrl}
                      title={v.title}
                      nickname={v.nickname}
                      content={v.content}
                      price={v.price}
                      date={v.date}
                      categoryId={v.categoryId}
                    />
                  </div>
                );
              })}
              {/* 무한 슬라이드를 위해 첫번째 슬라이드 복제 */}
              <div>
                <CarouselSlide
                  posterImg={carouselData[0].imageUrl}
                  title={carouselData[0].title}
                  nickname={carouselData[0].nickname}
                  content={carouselData[0].content}
                  price={carouselData[0].price}
                  date={carouselData[0].date}
                  categoryId={carouselData[0].categoryId}
                />
              </div>
            </>
          )}
        </Styled_CarouselLogicStyled.Container>
      </Styled_CarouselLogicStyled.Div>
    </>
  );
};

export default Main;
