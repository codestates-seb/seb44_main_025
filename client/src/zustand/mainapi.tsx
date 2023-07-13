import { create } from 'zustand';

interface Perpomence {
  title: string;
  artistId: number;
  content: string;
  date: string;
  price: number;
  place: string;
  nickname: string;
  totalSeat: number;
  categoryId: number;
  imageUrl: string;
}
interface Artist {
  nickname: string;
  imageUrl: string;
  artistId: number;
}

type Store = {
  carouselData: Perpomence[] | [];
  setCarouselData: (state: Perpomence[]) => void;
};
type Store2 = {
  artistData: Artist[] | [];
  setArtistData: (state: Artist[]) => void;
};

export const CarouselList = create<Store>(set => ({
  carouselData: [],
  setCarouselData: state => set({ carouselData: state }),
}));

export const ArtistList = create<Store2>(set => ({
  artistData: [],
  setArtistData: state => set({ artistData: state }),
}));
