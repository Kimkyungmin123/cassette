import {
  ColorStore,
  DropdownStore,
  ResponseUserStore,
  TokenStore,
  UserStore,
} from 'types/store';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useColorStore = create<ColorStore>()(
  persist(
    (set) => ({
      tapeColor: 'cassette_orange',
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
      tapeId: 0,
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
      tapeColor: 'cassette_orange',
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
