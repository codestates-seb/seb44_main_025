import { create } from 'zustand';

interface MyPage {
  id?: number;
  artistId?: number;
  userId?: number;
  nickName?: string;
  imageUrl?: string;
  profileImageUrl?: string;
  hasArtist?: boolean;
}

interface Performancelist {
  userId: number;
  title: string;
  artistId: number;
  category: string;
  date: string;
  price: number;
  artistName: string;
  categoryId: number;
  imageUrl: string;
  id?: number;
}

interface Reviewlist {
  nickName: string;
  reviewTitle: string;
  artistId?: number;
  content: string;
}

type Store1 = {
  myPageData: MyPage;
  setMyPageData: (state: MyPage) => void;
};

export const MyPageList = create<Store1>(set => ({
  myPageData: {},
  setMyPageData: state => set({ myPageData: state }),
}));

type Store2 = {
  performanceData: Performancelist[] | [];
  setPerformanceData: (state: Performancelist[]) => void;
};

export const MyPagePerformanceList = create<Store2>(set => ({
  performanceData: [],
  setPerformanceData: state => set({ performanceData: state }),
}));

type Store3 = {
  reviewData: Reviewlist[] | [];
  setReviewData: (state: Reviewlist[]) => void;
};
export const MyPageReviewList = create<Store3>(set => ({
  reviewData: [],
  setReviewData: state => set({ reviewData: state }),
}));
