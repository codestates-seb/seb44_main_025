import { create } from 'zustand';
import { PerformanceType } from '../model/Performance';
import { ArtistData } from '../model/Artist';

type Store = {
  carouselData: PerformanceType[] | [];
  setCarouselData: (state: PerformanceType[]) => void;
};
type Store2 = {
  artistData: ArtistData[] | [];
  setArtistData: (state: ArtistData[]) => void;
};

export const CarouselList = create<Store>(set => ({
  carouselData: [],
  setCarouselData: state => set({ carouselData: state }),
}));

export const ArtistList = create<Store2>(set => ({
  artistData: [],
  setArtistData: state => set({ artistData: state }),
}));
