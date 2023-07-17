import { create } from 'zustand';
import { ArtistDataProps } from '../model/Artist';

type Store = {
  artistInfo: ArtistDataProps;
  setArtistInfo: (state: ArtistDataProps) => void;
};

export const ArtistInfoData = create<Store>(set => ({
  artistInfo: {
    artistname: '',
    snslink: '',
    content: '',
  },
  setArtistInfo: state => {
    // console.log(state);
    return set({ artistInfo: state });
  },
}));
