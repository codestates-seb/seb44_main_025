import { create } from 'zustand';
import { PerformanceType } from '../model/Performance';
import { ArtistData } from '../model/Artist';

type Store = {
  carouselList: PerformanceType[];
  setCarouselList: (state: PerformanceType[]) => void;
  artistList: ArtistData[];
  setArtistList: (state: ArtistData[]) => void;
};

export const useHomePage = create<Store>(set => ({
  carouselList: [],
  setCarouselList: state => set((prevState)=> ({...prevState, carouselList: state })),
  artistList: [],
  setArtistList: state => set((prevState)=> ({...prevState,artistList: state })),
}));
