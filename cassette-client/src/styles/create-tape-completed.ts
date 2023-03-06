import styled from '@emotion/styled';

import theme from './theme';

export const CompletedTapeContainer = styled.div`
  padding: 93px 24px 0 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Box = styled.div<{ margin?: string }>`
  margin: ${({ margin }) => margin && margin};
`;

export const CurrentName = styled.div`
  margin: 8px 0 11px 0;
  span {
    color: ${theme.colors.gray_500};
    font-family: 'Ycomputer-Regular';
    font-size: ${theme.fontSize.sm};
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: center;
  }

  div {
    height: 21px;
  }
`;

export const TapeCount = styled.div`
  display: flex;
  width: 100%;
  max-width: 324px;
  margin-top: 24px;
  span {
    color: ${theme.colors.gray_500};
    font-family: 'Ycomputer-Regular';
    font-size: ${theme.fontSize.xs};
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 0em;
    text-align: left;
  }
`;

export const TrackName = styled.div`
  font-family: 'Ycomputer-Regular';
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.white};
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: center;
`;

export const TrackBox = styled.div<{ isShown: boolean }>`
  opacity: ${({ isShown }) => (isShown ? 1 : 0.5)};
`;

export const TrackCollection = styled.div`
  width: 100%;
  height: 176px;
  display: grid;
  margin: 0;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 16px;
  column-gap: 30px;
  max-width: 324px;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
  -ms-overflow-style: none;
  margin-bottom: 40px;
  margin-top: 12px;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const GuestTrack = styled.div<{ isShown: boolean }>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  opacity: ${({ isShown }) => (isShown ? 1 : 0.5)};
  ${({ isShown }) => (isShown ? 1 : 0.5)};
`;

export const PopupText = styled.div`
  position: absolute;
  top: 612px;
  display: flex;
  justify-content: center;
  color: ${theme.colors.white};
  font-size: ${theme.fontSize.xs};
  text-align: left;
  font-family: 'Pretendard-Regular';
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0em;
`;

export const BottomZone = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ToastZone = styled.div`
  position: absolute;
  bottom: 36px;
`;
