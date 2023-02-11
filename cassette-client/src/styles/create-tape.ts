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

export const ToastZone = styled.div`
  position: absolute;
  bottom: 36px;
`;

export const TrackContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  position: relative;
`;

export const TrackName = styled.div`
  font-family: 'Ycomputer-Regular';
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.white};
`;

export const TrackBox = styled.div<{ isShown: boolean }>`
  opacity: ${({ isShown }) => (isShown ? 1 : 0.5)};
`;

export const PopupText = styled.div`
  display: flex;
  justify-content: center;
  color: ${theme.colors.white};
  font-size: ${theme.fontSize.xs};
  text-align: left;
  margin-bottom: 10px;
`;
