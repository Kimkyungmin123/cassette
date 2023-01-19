import { Color } from 'types';

export interface Login {
  result: {
    memberInformation: User;
    jwtInformation: Token;
    tapes: [];
  };
  message: string;
  timestamp: string;
}

export interface UserInfo {
  result: User;
  message: string;
  timestamp: string;
}

export interface TapeInfo {
  result: Tape[];
  message: string;
  timestamp: string;
}

interface User {
  name: string;
  email: string;
  socialLoginType: SocialLogin;
}

// TODO: refreshToken 없어지면 제거.
interface Token {
  accessToken: string;
  refreshToken: string;
}

interface Tape {
  colorCode: Color;
  name: string;
  tapeLink: string;
  fileName?: string;
  audioLink?: string;
  tracks?: Track[];
}

interface Track {
  trackId: number;
  tapeId: number;
  name: string;
  senderName: string;
  fileName: string;
  audioLink: string;
}

type SocialLogin = 'KAKAO';
