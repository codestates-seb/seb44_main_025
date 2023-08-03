import * as S from './Postcode.style';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Input } from '../inputs/Inputs';
import { Button } from '../buttons/Buttons';

// **** 중요: 타입 정의 후 tsx 파일로 변환하기 ****
declare global {
  interface Window {
    kakao: any;
  }
}

const { daum, kakao } = window;

export const PostcodeMap = ({
  defaultAddress,
  onChangeAddress,
}: {
  defaultAddress?: string;
  onChangeAddress: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [address, setAddress] = useState('');
  const divRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const geocoderRef = useRef<any>(null);
  useEffect(() => {
    setAddress(defaultAddress || '');
    if (kakao?.maps?.services) {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoderRef.current = geocoder;
      const mapContainer = divRef.current, // 지도 div
        mapOption = {
          center: new kakao.maps.LatLng(37.556944, 126.923917), // 지도 중심좌표 - 홍대
          level: 5, // 지도의 확대 레벨
        };
      // map, marker 생성
      const map = new kakao.maps.Map(mapContainer, mapOption);
      mapRef.current = map;
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(37.556944, 126.923917),
        map: map,
      });
      markerRef.current = marker;
    }
  }, []);
  useEffect(() => {
    if (defaultAddress) {
      // 전달된 address로 검색 후 마커 이동
      geocoderRef.current?.addressSearch(
        defaultAddress,
        (results: any, status: any) => {
          if (status === kakao.maps.services.Status.OK) {
            const result = results[0];
            const coords = new kakao.maps.LatLng(result.y, result.x);
            if (divRef.current) {
              divRef.current.style.display = 'block';
            }
            mapRef.current.relayout();
            mapRef.current.setCenter(coords);
            markerRef.current.setPosition(coords);
          }
        }
      );
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
        geocoderRef.current?.addressSearch(
          data.address,
          (results: any, status: any) => {
            if (status === kakao.maps.services.Status.OK) {
              const result = results[0];
              const coords = new kakao.maps.LatLng(result.y, result.x);
              if (divRef.current) {
                divRef.current.style.display = 'block';
              }
              mapRef.current.relayout();
              mapRef.current.setCenter(coords);
              markerRef.current.setPosition(coords);
            }
          }
        );
      },
    }).open();
  }, []);

  return (
    <S.MapContainer>
      <S.TitleButtonFlex>
        <S.Heading3>공연장 위치</S.Heading3>
        <Button theme="primary" size="small" onClick={() => handleSearch()}>
          주소 검색
        </Button>
      </S.TitleButtonFlex>
      <Input
        theme="light"
        width={360}
        disabled
        height={30}
        placeholder="주소찾기 버튼을 클릭하세요"
        value={address || ''}
        onChange={e => setAddress(e.target.value)}
      />
      {mapRef.current ? (
        <S.MapDiv id="map" ref={divRef} />
      ) : (
        <S.MapDiv id="map" ref={divRef}>
          지도를 불러오지 못하였습니다.
        </S.MapDiv>
      )}
    </S.MapContainer>
  );
};

export const Map = ({ address }: { address: string }) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const geocoderRef = useRef<any>(null);
  useEffect(() => {
    if (kakao?.maps?.services) {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoderRef.current = geocoder;
      const mapContainer = divRef.current, // 지도 div
        mapOption = {
          center: new kakao.maps.LatLng(37.556944, 126.923917), // 지도 중심좌표 - 홍대
          level: 5, // 지도의 확대 레벨
        };
      // map, marker 생성
      const map = new kakao.maps.Map(mapContainer, mapOption);
      mapRef.current = map;
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(37.556944, 126.923917),
        map: map,
      });
      markerRef.current = marker;
    }
  }, []);
  useEffect(() => {
    if (address) {
      // 전달된 address로 검색 후 마커 이동
      geocoderRef.current?.addressSearch(
        address,
        (results: any, status: any) => {
          if (status === kakao.maps.services.Status.OK) {
            const result = results[0];
            const coords = new kakao.maps.LatLng(result.y, result.x);
            if (divRef.current) {
              divRef.current.style.display = 'block';
            }
            mapRef.current.relayout();
            mapRef.current.setCenter(coords);
            markerRef.current.setPosition(coords);
          }
        }
      );
    }
  }, [address]);

  return (
    <S.MapContainer>
      <S.TitleButtonFlex>
        <S.Heading3>공연장 위치</S.Heading3>
      </S.TitleButtonFlex>
      <S.Paragraph>{address || '홍대'}</S.Paragraph>
      {mapRef.current ? (
        <S.MapDiv id="map" ref={divRef} />
      ) : (
        <S.MapDiv id="map" ref={divRef}>
          {'지도를 불러오지 못하였습니다.'}
        </S.MapDiv>
      )}
    </S.MapContainer>
  );
};
