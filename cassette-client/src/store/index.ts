import {
  ColorStore,
  DropdownStore,
  PlayStore,
  ResponseUserStore,
  TokenStore,
  UserStore,
} from 'types/store';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useColorStore = create<ColorStore>()(
  persist(
    (set) => ({
      tapeColor: '',

      setTapeColor: (value) => {
        set(() => ({ tapeColor: value }));
      },
    }),
    { name: 'persist' },
  ),
);

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userNickname: '',
      tapename: '',
      date: '',

      setUserData: (userNickname, tapename) => {
        set(() => ({ userNickname, tapename }));
      },
      setDate: (date) => {
        set(() => ({ date }));
      },
    }),
    { name: 'persist' },
  ),
);

export const useResponsUserStore = create<ResponseUserStore>()(
  persist(
    (set) => ({
      userURL: '',
      tapeId: -1,

      setResponsUser: (userURL, tapeId) => {
        set(() => ({ userURL, tapeId }));
      },
    }),
    { name: 'persist' },
  ),
);

export const tokenStore = create<TokenStore>()(
  devtools((set) => ({
    refreshToken: '',

    setToken: (refreshToken) => {
      set(() => ({ refreshToken }));
    },
  })),
);

export const useGuestColorStore = create<ColorStore>()(
  persist(
    (set) => ({
      tapeColor: '',

      setTapeColor: (value) => {
        set(() => ({ tapeColor: value }));
      },
    }),
    { name: 'persist' },
  ),
);

export const useGuestInfoStore = create<UserStore>()(
  persist(
    (set) => ({
      userNickname: '',
      tapename: '',
      date: '',

      setUserData: (userNickname, tapename) => {
        set(() => ({ userNickname, tapename }));
      },
      setDate: (date) => {
        set(() => ({ date }));
      },
    }),
    { name: 'persist' },
  ),
);
export const useGuestResponsStore = create<ResponseUserStore>()(
  persist(
    (set) => ({
      userURL: '',

      setResponsUser: (userURL) => {
        set(() => ({ userURL }));
      },
    }),
    { name: 'persist' },
  ),
);

export const dropdownStore = create<DropdownStore>()(
  devtools((set) => ({
    dropContent: '',
    dropType: null,

    setDropData: (dropContent, dropType) => {
      set(() => ({ dropContent, dropType }));
    },
  })),
);

export const usePlayStore = create<PlayStore>()(
  devtools((set) => ({
    isPlayAudio: false,

    setIsPlayAudio: (isPlayAudio) => {
      set(() => ({ isPlayAudio }));
    },
  })),
);
