import styled from '@emotion/styled';
import theme from 'styles/theme';

export const Box = styled.div<{ margin?: string }>`
  margin: ${({ margin }) => margin && margin};
`;

export const InputBox = styled.div`
  margin-bottom: 32px;
`;

export const Info = styled.span`
  display: block;
  text-align: left;
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.gray_600};
  margin-top: 8px;
`;

export const BottomZone = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

export const TosatZone = styled.div`
  position: absolute;
  bottom: 36px;
`;
