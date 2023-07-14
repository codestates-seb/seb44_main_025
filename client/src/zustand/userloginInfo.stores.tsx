import { create } from 'zustand';

interface UserInfoType {
  memberId: number;
}

type Store = {
  userData: UserInfoType | object;
  setUserData: (state: UserInfoType) => void;
};

export const UserLoginInfo = create<Store>(set => ({
  userData: {},
  setUserData: state => set({ userData: state }),
}));
