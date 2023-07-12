import { create } from 'zustand';

interface Artistpage {
  artistId: number;
  artistname: string;
  imageUrl: string;
  profileimageUrl: string;
  snslink: string;
  content: string;
}
interface Performancelist {
  title: string;
  artistId: number;
  category: string;
  date: string;
  price: number;
  place: string;
  artistname: string;
  totalSeat: number;
  categoryId: number;
  imageUrl: string;
}

type Store1 = {
  artistpageData: Artistpage[] | [];
  setArtistpageData: (state: Artistpage[]) => void;
};

type Store2 = {
  performanceData: Performancelist[] | [];
  setPerformanceData: (state: Performancelist[]) => void;
};

export const ArtistpageList = create<Store1>(set => ({
  artistpageData: [],
  setArtistpageData: state => set({ artistpageData: state }),
}));

export const ArtistpagePerformanceList = create<Store2>(set => ({
  performanceData: [],
  setPerformanceData: state => set({ performanceData: state }),
}));
