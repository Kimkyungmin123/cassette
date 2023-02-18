import styled from '@emotion/styled';

import theme from './theme';

export const MakeTapeContainer = styled.div`
  margin: 113px 24px 0 24px;
`;

export const WarningZone = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;

  p {
    font-family: 'Pretendard-Regular';
    font-size: ${theme.fontSize.sm};
    color: ${theme.colors.gray_500};
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    margin: 0 0 0 8px;
  }
`;
