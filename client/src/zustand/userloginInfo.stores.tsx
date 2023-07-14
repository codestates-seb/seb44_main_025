import { create } from 'zustand';

interface UserInfoType {
  memberId: number;
  category: string;
  artistId: number;
  artistName: string;
  imageUrl: string;
  content: string;
  createdAt: string;
}

type Store = {
  userData: UserInfoType | object;
  setUserData: (state: UserInfoType) => void;
};

export const UserLoginInfo = create<Store>(set => ({
  userData: {},
  setUserData: state => set({ userData: state }),
}));
