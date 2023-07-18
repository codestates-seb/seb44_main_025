import { create } from 'zustand';
import { ArtistDataProps } from '../model/Artist';

type Store = {
  artistInfo: ArtistDataProps;
  setArtistInfo: (state: ArtistDataProps) => void;
};

/** 서버에서 데이터 값을 받아온 상태관리 함수 */
export const ArtistInfoData = create<Store>(set => ({
  // 초기값을 설정
  artistInfo: {
    artistname: '',
    snslink: '',
    content: '',
  },
  // 전달받은 값이 들어와서 artistInfo로 전달됨
  setArtistInfo: state => {
    // console.log(state);
    return set({ artistInfo: state });
  },
}));
