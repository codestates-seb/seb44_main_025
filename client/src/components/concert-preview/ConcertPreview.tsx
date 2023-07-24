import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { PerformanceType } from '../../model/Performance';
import { useGetArtist } from '../../api/useFetch';
import { DeviceQuery } from '../../utils/Media';
import { screenScale } from '../../utils/MediaSize';

export default function Concertpreview(performance: PerformanceType) {
  const navigate = useNavigate();
  const date = new Date(performance.date as string);
  const artist = useGetArtist(
    Object.values(performance.performanceArtist.performanceArtistList)[0]
  );
  return (
    <S.ConcertpreviewWrapper
      onClick={() => {
        navigate(`/performances/${performance.performanceId}`);
      }}
    >
      <S.ConcertImg src={performance.imageUrl} />
      <S.ConcertDetail>
        <S.ConcertTitle>{performance.title || '타이틀'}</S.ConcertTitle>
        <S.Concertcontent>
          {artist?.artistName || '탈퇴한 아티스트'}
        </S.Concertcontent>
        <S.Concertcontent>{performance.category || '기타'}</S.Concertcontent>
        <S.Concertcontent>
          ₩{performance.price.toLocaleString() || '가격'}
        </S.Concertcontent>
        <S.Concertcontent>{date.toLocaleDateString()}</S.Concertcontent>
        {/* <S.Concertcontent>{date.toLocaleTimeString()}</S.Concertcontent> */}
        {/* <ButtonWithArrowDark text={'예약취소'}></ButtonWithArrowDark> */}
      </S.ConcertDetail>
    </S.ConcertpreviewWrapper>
  );
}

const S = {
  ConcertpreviewWrapper: styled.div`
    cursor: pointer;
    width: 360px;
    height: 180px;
    background-color: var(--font-mid-color);
    border-radius: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    margin-left: 15px;
    cursor: pointer;
    &:hover {
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12),
        0 4px 4px rgba(0, 0, 0, 0.12), 0 8px 8px rgba(0, 0, 0, 0.12),
        0 16px 16px rgba(0, 0, 0, 0.12);
    }
    ${DeviceQuery.tablet`
    width: calc(360px * ${screenScale.tablet});
    height: calc(180px * ${screenScale.tablet});
 `}
  `,
  ConcertImg: styled.img`
    ${DeviceQuery.tablet`
    width: calc(200px * ${screenScale.tablet});
    height: calc(150px * ${screenScale.tablet});
 `}
    width: 200px;
    height: 150px;
    border: 3px solid transparent;
    border-radius: 35%;
    background-image: linear-gradient(#fff, #fff),
      linear-gradient(
        to top right,
        var(--image-border-bottom-color),
        var(--image-border-top-color)
      );
    background-origin: border-box;
    background-clip: content-box, border-box;
    margin-left: 15px;
  `,
  ConcertDetail: styled.section`
    ${DeviceQuery.tablet`
    margin-left: calc(10px * ${screenScale.tablet});
    margin-right: calc(15px * ${screenScale.tablet});
    height: calc(150px * ${screenScale.tablet});
 `}
    margin-left: 10px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-end;
    margin-right: 15px;
  `,
  ConcertTitle: styled.h6`
    font-size: var(--heading6-font-size);
    line-height: var(--heading6-line-height);
    font-weight: var(--heading6-font-weight);
    color: var(--font-white-color);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-align: right;
  `,
  Concertcontent: styled.p`
    font-size: var(--p-small-regular-font-size);
    font-weight: var(--p-small-regular-font-weight);
    line-height: var(--p-small-regular-line-height);
    color: var(--font-light-white-color);
  `,
};
