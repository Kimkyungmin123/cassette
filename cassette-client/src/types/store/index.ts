import { Color, WithdrawalType } from 'types';

export interface UserStore {
  userNickname: string;
  tapename: string;
  date: string;
  tapeColor: Color | '';
  userURL: string;
  tapeId: number;

  setUserData: (userNickname: string, tapename: string) => void;
  setDate: (date: string) => void;
  setTapeColor: (tapeColor: Color) => void;
  setResponsUser: (useURL: string, tapeId?: number) => void;
}

export interface TokenStore {
  refreshToken: string;

  setToken: (refreshToken: string) => void;
}

export interface DropdownStore {
  dropContent: string;
  dropType: WithdrawalType | null;

  setDropData: (dropContent?: string, dropType?: WithdrawalType) => void;
}

export interface PlayStore {
  isPlayAudio: boolean;

  setIsPlayAudio: (isPlayAudio: boolean) => void;
}

export interface RecordStore {
  isGlobalRecording: boolean;

  setIsGlobalRecording: (isGlobalRecording: boolean) => void;
}
