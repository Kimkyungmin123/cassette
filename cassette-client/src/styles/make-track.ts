import styled from '@emotion/styled';

import theme from './theme';

export const BackButtonZone = styled.div`
  position: absolute;
  top: 52px;
  left: 24px;
`;

export const MakeTapeContainer = styled.div`
  padding: 0 24px;
  height: 100%;
`;

export const TapeLoading = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
`;

export const TapeContent = styled.div`
  padding-top: 143px;
`;

export const WarningZone = styled.div<{ firstEntry: boolean }>`
  margin: 104px 0 12px 0;

  ${({ firstEntry }) =>
    firstEntry
      ? `height: 40px`
      : `  width: 100%;
display: flex;
justify-content: center;
align-items: center;
height: 40px;


p {
  font-family: 'Pretendard-Regular';
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.gray_500};
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  margin: 0 0 0 8px;
}`}
`;
