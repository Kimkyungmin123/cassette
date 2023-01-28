import { Color } from 'types';

export interface ColorStore {
  tapeColor: Color;
  setTapeColor: (tapeColor: Color) => void;
}

export interface UserStore {
  userNickname: string;
  tapename: string;
  setUserData: (userNickname: string, tapename: string) => void;
}

export interface ResponseUserStore {
  userURL: string;
  tapeId?: number;
  setResponsUser: (useURL: string, tapeId?: number) => void;
}

export interface TokenStore {
  refreshToken: string;
  setToken: (refreshToken: string) => void;
}
