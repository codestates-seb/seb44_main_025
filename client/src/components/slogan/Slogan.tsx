import { useEffect, useState } from 'react';
import { Styled_Slogan } from './Slogan.styled';
import { useUserInfo } from '../../zustand/userInfo.stores';

const Slogan = () => {
  let [movement, setMovement] = useState(0);
  let [time, setTime] = useState(0.5);
  const mobileSizeHeight = 60; // 슬로건 모바일 높이
  const tabletSizeHeight = 60 * 1.5; // 캐러셀 타블렛 높이
  const tabletbifurcationPoint = 820; // 타블렛분기점
  let [carouselHeight, setCarouselHeight] = useState(
    window.innerWidth >= tabletbifurcationPoint
      ? tabletSizeHeight
      : mobileSizeHeight
  ); // 첫 로딩시 슬로건 크기 초기값 세팅
  const { userInfo_zustand } = useUserInfo();

  /** 슬로건 4초마다 동작 */
  useEffect(() => {
    const interval = setInterval(() => {
      SlideTransitionControl();
    }, 4000);
    return () => {
      clearInterval(interval);
    };
  }, [movement]);

  /** 슬로건 슬라이드 좌표 지정하는 함수 */
  function SlideTransitionControl() {
    // 마지막 슬라이드가 아닌 경우
    if (movement !== -1 * carouselHeight) {
      setTime(0.5);
      setMovement(movement - carouselHeight);
    }
    // 마지막 슬라이드인 경우
    else {
      /** 마지막 슬라이드에서 첫 슬라이드로 */
      // 0.5초동안 슬라이드 넘김
      setMovement(movement - carouselHeight);
      // 0.5초 후, 0초동안 첫 번째 슬라이드로 이동(사람 눈엔 보이지 않음)
      setTimeout(function () {
        setMovement(0);
        setTime(0);
      }, 500);
    }
  }

  return (
    <Styled_Slogan.Container>
      <Styled_Slogan.ImgGroup
        translate={`translateY(${movement}px)`}
        transform={`transform ${time}s`}
      >
        <a
          href={
            userInfo_zustand?.hasArtist === true
              ? '/performances/register'
              : userInfo_zustand?.hasArtist === false
              ? '/artistregist'
              : '/login'
          }
        >
          <Styled_Slogan.Img src="./images/dd28119305b114d0.png" />
        </a>
        <a
          href={
            userInfo_zustand?.hasArtist === false ? '/artistregist' : '/login'
          }
        >
          <Styled_Slogan.Img src="./images/7955f4c5e4d540fb.png" />
        </a>
        <a
          href={
            userInfo_zustand?.hasArtist === true
              ? '/performances/register'
              : userInfo_zustand?.hasArtist === false
              ? '/artistregist'
              : '/login'
          }
        >
          <Styled_Slogan.Img src="./images/dd28119305b114d0.png" />
        </a>
      </Styled_Slogan.ImgGroup>
    </Styled_Slogan.Container>
  );
};

export default Slogan;
