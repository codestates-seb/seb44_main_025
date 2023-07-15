import { create } from 'zustand';

interface UserInfoType {
  memberId?: number;
  hasArtist?: boolean;
}

type Store = {
  userData: UserInfoType;
  setUserData: (state: UserInfoType) => void;
};

export const UserLoginInfo = create<Store>(set => ({
  userData: {},
  setUserData: state => set({ userData: state }),
}));
