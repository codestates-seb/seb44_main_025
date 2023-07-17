import * as S from './Postcode.style';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Input } from '../inputs/Inputs';
import { Button } from '../buttons/Buttons';

// **** 중요: 타입 정의 후 tsx 파일로 변환하기 ****

const { daum } = window;
// 주소-좌표 변환 객체를 생성 - 스크립트 로딩 시 최초 1회
const geocoder = new daum.maps.services.Geocoder();

export const PostcodeMap = ({ onChangeAddress }) => {
  const [address, setAddress] = useState('');
  const divRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  useEffect(() => {
    const mapContainer = divRef.current, // 지도 div
      mapOption = {
        center: new daum.maps.LatLng(37.556944, 126.923917), // 지도 중심좌표 - 홍대
        level: 6, // 지도의 확대 레벨
      };
    // 지도를 미리 생성 후 ref로 참조 유지
    const map = new daum.maps.Map(mapContainer, mapOption);
    mapRef.current = map;
    // 마커를 미리 생성 후 ref로 참조 유지
    const marker = new daum.maps.Marker({
      position: new daum.maps.LatLng(37.556944, 126.923917),
      map: mapRef.current,
    });
    markerRef.current = marker;
  }, []);
  const handleSearch = useCallback(() => {
    new daum.Postcode({
      oncomplete: data => {
        const addr = data.address;
        // 주소 state 업데이트 -> 내부적으로 마커 위치 갱신 + 부모 요소로 전달
        if (addr !== address) {
          setAddress(addr);
          onChangeAddress(addr);
        }
        geocoder.addressSearch(data.address, (results, status) => {
          if (status === daum.maps.services.Status.OK) {
            const result = results[0];
            const coords = new daum.maps.LatLng(result.y, result.x);
            divRef.current.style.display = 'block';
            mapRef.current.relayout();
            mapRef.current.setCenter(coords);
            markerRef.current.setPosition(coords);
          }
        });
      },
    }).open();
  }, []);

  return (
    <>
      <S.TitleButtonFlex>
        <S.Heading3>공연장 위치</S.Heading3>
        <Button theme="primary" size="small" onClick={() => handleSearch()}>
          주소 검색
        </Button>
      </S.TitleButtonFlex>
      <Input
        theme="light"
        size="large"
        disabled
        height={30}
        placeholder="주소찾기 버튼을 클릭하세요"
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
      <S.MapDiv id="map" ref={divRef} />
    </>
  );
};

export const Map = ({ address }) => {
  const divRef = useRef(null);
  useEffect(() => {
    const mapContainer = divRef.current, // 지도 div
      mapOption = {
        center: new daum.maps.LatLng(37.556944, 126.923917), // 지도 중심좌표 - 홍대
        level: 5, // 지도의 확대 레벨
      };
    // map, marker 생성
    const map = new daum.maps.Map(mapContainer, mapOption);
    const marker = new daum.maps.Marker({
      position: new daum.maps.LatLng(37.556944, 126.923917),
      map: map,
    });
    // 전달된 address로 검색 후 마커 이동
    geocoder.addressSearch(address, (results, status) => {
      if (status === daum.maps.services.Status.OK) {
        const result = results[0];
        const coords = new daum.maps.LatLng(result.y, result.x);
        divRef.current.style.display = 'block';
        map.relayout();
        map.setCenter(coords);
        marker.setPosition(coords);
      }
    });
  }, []);

  return (
    <>
      <S.TitleButtonFlex>
        <S.Heading3>공연장 위치</S.Heading3>
      </S.TitleButtonFlex>
      <S.Paragraph>{address || '홍대'}</S.Paragraph>
      <S.MapDiv id="map" ref={divRef} />
    </>
  );
};
