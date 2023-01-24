import { Color } from 'types';

export interface Login {
  result: {
    memberInformation: User;
    jwtInformation: Token;
    tapes: LoginTape[] | [];
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
  result: Cassette[];
  message: string;
  timestamp: string;
}

export interface GetToken {
  result: Token;
  message: string;
  timestamp: string;
}

interface User {
  name: string;
  email: string;
  socialLoginType: SocialLogin;
}

interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface Tape {
  colorCode: Color;
  title: string;
  name: string;
  tapeLink: string;
  fileName: string | null;
  audioLink: string | null;
}

interface LoginTape extends Omit<Tape, 'fileName' | 'title'> {
  colorCode: Color;
  name: string;
  tapeLink: string;
  audioLink: string | null;
  tapeId: number;
}

interface Cassette extends Tape {
  tracks: Track[];
}

interface Track {
  trackId: number;
  tapeId: number;
  colorCode: Color;
  title: string;
  name: string;
  fileName: string;
  audioLink: string;
}

type SocialLogin = 'KAKAO';
