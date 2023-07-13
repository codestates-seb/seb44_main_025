import { create } from 'zustand';

interface Artistpage {
  id?: number;
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

interface Reviewlist {
  nickname: string;
  reviewtitle: string;
  artistId?: number;
  content: string;
}

type Store1 = {
  artistpageData: Artistpage[] | [];
  setArtistpageData: (state: Artistpage[]) => void;
};

type Store2 = {
  performanceData: Performancelist[] | [];
  setPerformanceData: (state: Performancelist[]) => void;
};

type Store3 = {
  reviewData: Reviewlist[] | [];
  setReviewData: (state: Reviewlist[]) => void;
};

export const ArtistpageList = create<Store1>(set => ({
  artistpageData: [],
  setArtistpageData: state => set({ artistpageData: state }),
}));

export const ArtistpagePerformanceList = create<Store2>(set => ({
  performanceData: [],
  setPerformanceData: state => set({ performanceData: state }),
}));

export const ArtistpageReviewList = create<Store3>(set => ({
  reviewData: [],
  setReviewData: state => set({ reviewData: state }),
}));
