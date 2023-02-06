import { WithdrawalData } from 'types';

export const WITHDRAWAL: WithdrawalData[] = [
  { type: 'REMOVE_PERSONAL_INFORMATION', content: '개인정보를 삭제하기 위해' },
  { type: 'NOT_REMOVE_TAPE', content: '테이프를 삭제할 수 없어서' },
  { type: 'INCONVENIENCE', content: '서비스 이용이 불편함' },
  { type: 'SERVICE_NOT_USED', content: '사용하지 않을 서비스' },
  { type: 'REJOIN', content: '그 외 기타' },
];
