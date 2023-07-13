import { create } from 'zustand';

interface MyPage {
  id?: number;
  artistId?: number;
  userId: number;
  nickname: string;
  imageUrl: string;
  profileimageUrl: string;
}

interface Performancelist {
  userId: number;
  title: string;
  artistId: number;
  category: string;
  date: string;
  price: number;
  artistname: string;
  categoryId: number;
  imageUrl: string;
  id?: number;
}

type Store1 = {
  myPageData: MyPage[] | [];
  setMyPageData: (state: MyPage[]) => void;
};

type Store2 = {
  performanceData: Performancelist[] | [];
  setPerformanceData: (state: Performancelist[]) => void;
};

export const MyPageList = create<Store1>(set => ({
  myPageData: [],
  setMyPageData: state => set({ myPageData: state }),
}));

export const MyPagePerformanceList = create<Store2>(set => ({
  performanceData: [],
  setPerformanceData: state => set({ performanceData: state }),
}));
