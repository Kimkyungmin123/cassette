export type Color =
  | 'cassette_orange'
  | 'cassette_tangerine'
  | 'cassette_pink'
  | 'cassette_darkpink'
  | 'cassette_purple'
  | 'cassette_green'
  | 'cassette_olive'
  | 'cassette_mint'
  | 'cassette_blue'
  | 'cassette_red';

export interface UserClient {
  nickname: string;
  tapename: string;
  tapeColor: Color;
}

export type WithdrawalType =
  | 'REMOVE_PERSONAL_INFORMATION'
  | 'REJOIN'
  | 'INCONVENIENCE'
  | 'SERVICE_NOT_USED'
  | 'NOT_REMOVE_TAPE';

export interface WithdrawalData {
  type: WithdrawalType;
  content: string;
}
