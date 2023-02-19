import styled from '@emotion/styled';
import { ButtonProps } from 'components/button';
import { ButtonLayout } from 'components/button/style';

import theme from './theme';

export const BackButtonZone = styled.div`
  position: absolute;
  top: 70px;
  left: 24px;
`;

export const MakeTapeContainer = styled.div`
  margin: 143px 24px 0 24px;
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

export const SubmitTapeButton = styled(ButtonLayout)<ButtonProps>`
  background-color: ${({ disabled }) =>
    disabled ? theme.colors.disabled : theme.colors.primary};
`;
