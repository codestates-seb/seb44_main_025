import * as S from './Postcode.style';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Input } from '../inputs/Inputs';
import { Button } from '../buttons/Buttons';

// **** 중요: 타입 정의 후 tsx 파일로 변환하기 ****

const { daum } = window;

export const PostcodeMap = ({ defaultAddress, onChangeAddress }) => {
  const [address, setAddress] = useState('');
  const divRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const geocoderRef = useRef(null);
  useEffect(() => {
    setAddress(defaultAddress);
    if (daum.maps?.services) {
      const geocoder = new daum.maps.services.Geocoder();
      geocoderRef.current = geocoder;
      const mapContainer = divRef.current, // 지도 div
        mapOption = {
          center: new daum.maps.LatLng(37.556944, 126.923917), // 지도 중심좌표 - 홍대
          level: 5, // 지도의 확대 레벨
        };
      // map, marker 생성
      const map = new daum.maps.Map(mapContainer, mapOption);
      mapRef.current = map;
      const marker = new daum.maps.Marker({
        position: new daum.maps.LatLng(37.556944, 126.923917),
        map: map,
      });
      markerRef.current = marker;
    }
  }, []);
  useEffect(() => {
    if (defaultAddress) {
      // 전달된 address로 검색 후 마커 이동
      geocoderRef.current?.addressSearch(defaultAddress, (results, status) => {
        if (status === daum.maps.services.Status.OK) {
          const result = results[0];
          const coords = new daum.maps.LatLng(result.y, result.x);
          divRef.current.style.display = 'block';
          mapRef.current.relayout();
          mapRef.current.setCenter(coords);
          markerRef.current.setPosition(coords);
        }
      });
    }
  }, [address]);
  const handleSearch = useCallback(() => {
    new daum.Postcode({
      oncomplete: data => {
        const addr = data.address;
        // 주소 state 업데이트 -> 내부적으로 마커 위치 갱신 + 부모 요소로 전달
        if (addr !== address) {
          setAddress(addr);
          onChangeAddress(addr);
        }
        geocoderRef.current?.addressSearch(data.address, (results, status) => {
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
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const geocoderRef = useRef(null);
  useEffect(() => {
    if (daum.maps?.services) {
      const geocoder = new daum.maps.services.Geocoder();
      geocoderRef.current = geocoder;
      const mapContainer = divRef.current, // 지도 div
        mapOption = {
          center: new daum.maps.LatLng(37.556944, 126.923917), // 지도 중심좌표 - 홍대
          level: 5, // 지도의 확대 레벨
        };
      // map, marker 생성
      const map = new daum.maps.Map(mapContainer, mapOption);
      mapRef.current = map;
      const marker = new daum.maps.Marker({
        position: new daum.maps.LatLng(37.556944, 126.923917),
        map: map,
      });
      markerRef.current = marker;
    }
  }, []);
  useEffect(() => {
    if (address) {
      // 전달된 address로 검색 후 마커 이동
      geocoderRef.current?.addressSearch(address, (results, status) => {
        if (status === daum.maps.services.Status.OK) {
          const result = results[0];
          const coords = new daum.maps.LatLng(result.y, result.x);
          divRef.current.style.display = 'block';
          mapRef.current.relayout();
          mapRef.current.setCenter(coords);
          markerRef.current.setPosition(coords);
        }
      });
    }
  }, [address]);

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
