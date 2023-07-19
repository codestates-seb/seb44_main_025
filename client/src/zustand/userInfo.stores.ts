import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserInfo {
  memberId?: number;
  hasArtist?: boolean;
  artistId?: number;
}

type Store = {
  userInfo2?: UserInfo;
  setUserInfo: (state: UserInfo) => void;
};

export const useUserInfo = create(
  persist<Store>(
    set => ({
      userInfo2: undefined,
      setUserInfo: state => set({ userInfo2: state }),
    }),
    {
      name: 'food-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
