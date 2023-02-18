import { Color, WithdrawalType } from 'types';

export interface ColorStore {
  tapeColor: Color;
  setTapeColor: (tapeColor: Color) => void;
}

export interface UserStore {
  userNickname: string;
  tapename: string;
  date: string;
  setUserData: (userNickname: string, tapename: string) => void;
  setDate: (date: string) => void;
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

export interface RecordStore {
  recordFile: string;
  setRecordFile: (recordFile: string) => void;
}

export interface DropdownStore {
  dropContent: string;
  dropType: WithdrawalType | null;

  setDropData: (dropContent?: string, dropType?: WithdrawalType) => void;
}
