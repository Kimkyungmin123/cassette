import {
  DropdownStore,
  PlayStore,
  RecordStore,
  TokenStore,
  UserStore,
} from 'types/store';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userNickname: '',
      tapename: '',
      date: '',
      tapeColor: '',
      userURL: '',
      tapeId: -1,

      setUserData: (userNickname, tapename) => {
        set(() => ({ userNickname, tapename }));
      },
      setDate: (date) => {
        set(() => ({ date }));
      },
      setTapeColor: (value) => {
        set(() => ({ tapeColor: value }));
      },
      setResponsUser: (userURL, tapeId) => {
        set(() => ({ userURL, tapeId }));
      },
    }),
    { name: 'user' },
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

export const useGuestInfoStore = create<UserStore>()(
  persist(
    (set) => ({
      userNickname: '',
      tapename: '',
      date: '',
      tapeColor: '',
      userURL: '',
      tapeId: -1,

      setUserData: (userNickname, tapename) => {
        set(() => ({ userNickname, tapename }));
      },
      setDate: (date) => {
        set(() => ({ date }));
      },
      setTapeColor: (tapeColor) => {
        set(() => ({ tapeColor }));
      },
      setResponsUser: (userURL, tapeId) => {
        set(() => ({ userURL, tapeId }));
      },
    }),
    { name: 'guest' },
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

export const useRecordStore = create<RecordStore>()(
  devtools((set) => ({
    isGlobalRecording: false,

    setIsGlobalRecording: (isGlobalRecording) => {
      set(() => ({ isGlobalRecording }));
    },
  })),
);
