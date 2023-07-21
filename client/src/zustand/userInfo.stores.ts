import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserInfo {
  memberId?: number;
  hasArtist?: boolean;
  artistId?: number;
}

type Store = {
  userInfo_zustand?: UserInfo;
  setUserInfo: (state: UserInfo) => void;
};

export const useUserInfo = create(
  persist<Store>(
    set => ({
      userInfo_zustand: undefined,
      setUserInfo: state => set({ userInfo_zustand: state }),
    }),
    {
      name: 'userInfo',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
