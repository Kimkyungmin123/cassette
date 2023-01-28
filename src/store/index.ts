import {
  ColorStore,
  ResponseUserStore,
  TokenStore,
  UserStore,
} from 'types/store';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useColorStore = create<ColorStore>()(
  persist((set) => ({
    tapeColor: 'cassette_orange',
    setTapeColor: (value) => {
      set(() => ({ tapeColor: value }));
    },
  })),
);

export const useUserStore = create<UserStore>()(
  persist((set) => ({
    userNickname: '',
    tapename: '',
    setUserData: (userNickname, tapename) => {
      set(() => ({ userNickname, tapename }));
    },
  })),
);

export const useResponsUserStore = create<ResponseUserStore>()(
  persist((set) => ({
    userURL: '',
    tapeId: 0,
    setResponsUser: (userURL, tapeId) => {
      set(() => ({ userURL, tapeId }));
    },
  })),
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
  persist((set) => ({
    tapeColor: 'cassette_orange',
    setTapeColor: (value) => {
      set(() => ({ tapeColor: value }));
    },
  })),
);

export const useGuestInfoStore = create<UserStore>()(
  persist((set) => ({
    userNickname: '',
    tapename: '',
    setUserData: (userNickname, tapename) => {
      set(() => ({ userNickname, tapename }));
    },
  })),
);

export const useGuestResponsStore = create<ResponseUserStore>()(
  persist((set) => ({
    userURL: '',

    setResponsUser: (userURL) => {
      set(() => ({ userURL }));
    },
  })),
);
