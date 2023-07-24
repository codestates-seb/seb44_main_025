import { useEffect, useState } from 'react';
import { useHomePage } from '../../zustand/homepage.stores';
import CarouselSlide from './CarouselSlide';
import { Styled_CarouselLogic } from './CarouselLogic.styled';
import { PerformanceType } from '../../model/Performance';
import { useGetArtist } from '../../api/useFetch';

const Main = () => {
  let [movementWidth, setMovementWidth] = useState(0);
  let [time, setTime] = useState(0.5);
  const { carouselList } = useHomePage();
  const mobileSize = 390; // 캐러셀 모바일 사이즈
  const tabletSize = 390 * 1.5; // 캐러셀 타블렛 사이즈
  const tabletbifurcationPoint = 820; // 타블렛분기점
  let [carouselWidth, setCarouselWidth] = useState(
    window.innerWidth >= tabletbifurcationPoint ? tabletSize : mobileSize
  ); // 첫 로딩시 캐러셀 크기 초기값 세팅

  /** 화면 크기 받아오는 함수 */
  const handleResize = () => {
    if (
      window.innerWidth >= tabletbifurcationPoint &&
      carouselWidth !== tabletSize
    ) {
      setCarouselWidth(tabletSize);
      location.reload();
    } else if (
      window.innerWidth < tabletbifurcationPoint &&
      carouselWidth !== mobileSize
    ) {
      setCarouselWidth(mobileSize);
      location.reload();
    }
  };

  /** handleResize 함수를 실행시키는 이벤트리스너 */
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

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
    if (movementWidth !== -1 * carouselWidth * (carouselList.length - 1)) {
      setTime(0.5);
      setMovementWidth(movementWidth - carouselWidth);
    }
    // 마지막 슬라이드인 경우
    else {
      /** 마지막 슬라이드에서 첫 슬라이드로 */
      // 0.5초동안 슬라이드 넘김
      setMovementWidth(movementWidth - carouselWidth);
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
          {carouselList.length !== 0 && (
            <>
              {/* 슬라이드 리스트 */}
              {carouselList.map((v: PerformanceType, i) => {
                // const artist = useGetArtist(
                //   Object.values(v.performanceArtist.performanceArtistList)[0]
                // );
                // console.log(artist);

                return (
                  <div key={i}>
                    <CarouselSlide
                      posterImg={v.imageUrl}
                      title={v.title}
                      performanceArtist={v.performanceArtist}
                      category={v.category}
                      price={v.price}
                      date={v.date}
                      performanceId={v.performanceId}
                    />
                  </div>
                );
              })}
              {/* 무한 슬라이드를 위해 첫번째 슬라이드 복제 */}
              <div>
                <CarouselSlide
                  posterImg={carouselList[0].imageUrl}
                  title={carouselList[0].title}
                  performanceArtist={carouselList[0].performanceArtist}
                  category={carouselList[0].category}
                  price={carouselList[0].price}
                  date={carouselList[0].date}
                  performanceId={carouselList[0].performanceId}
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
