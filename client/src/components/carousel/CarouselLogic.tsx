import { useEffect, useState } from 'react';
import { CarouselList } from '../../zustand/homepage.stores';
import CarouselSlide from './CarouselSlide';
import { Styled_CarouselLogic } from './CarouselLogic.styled';
import { PerformanceType } from '../../model/Performance';

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
    // 마지막 슬라이드가 아닌 경우
    if (movementWidth !== -390 * (carouselData.length - 1)) {
      setTime(0.5);
      setMovementWidth(movementWidth - 390);
    }
    // 마지막 슬라이드인 경우
    else {
      /** 마지막 슬라이드에서 첫 슬라이드로 */
      // 0.5초동안 슬라이드 넘김
      setMovementWidth(movementWidth - 390);
      // 0.5초 후, 0초동안 첫 번째 슬라이드로 이동(사람 눈엔 보이지 않음)
      setTimeout(function () {
        setMovementWidth(0);
        setTime(0);
      }, 500);
    }
  }

  return (
    <>
      <Styled_CarouselLogic.Div>
        <Styled_CarouselLogic.Container
          translate={`translate(${movementWidth}px)`}
          transform={`transform ${time}s`}
        >
          {carouselData.length !== 0 && (
            <>
              {/* 슬라이드 리스트 */}
              {carouselData.map((v: PerformanceType, i) => {
                return (
                  <div key={i}>
                    <CarouselSlide
                      posterImg={v.imageUrl}
                      title={v.title}
                      performanceArtist={v.performanceArtist.performanceId}
                      category={v.category}
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
                  performanceArtist={
                    carouselData[0].performanceArtist.performanceId
                  }
                  category={carouselData[0].category}
                  price={carouselData[0].price}
                  date={carouselData[0].date}
                  categoryId={carouselData[0].categoryId}
                />
              </div>
            </>
          )}
        </Styled_CarouselLogic.Container>
      </Styled_CarouselLogic.Div>
    </>
  );
};

export default Main;
