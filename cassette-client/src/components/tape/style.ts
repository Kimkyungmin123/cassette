import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { ButtonLayout } from 'components/button/style';
import theme from 'styles/theme';

export const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const TypeStyle = styled.div`
  font-family: 'Ycomputer-Regular';
`;

export const ClearButton = styled(ButtonLayout)`
  border-radius: 50%;
  color: ${theme.colors.white};
  max-width: 50px;
  height: 35px;

  :disabled {
    cursor: default;
    opacity: 0.5;
  }
`;

export const RecordingContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0 22px 0;
`;

export const Time = styled.div`
  margin-top: 32px;
  color: ${theme.colors.white};
`;

export const RecordButtonZone = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AudioContainer = styled.div`
  width: 100%;
`;

export const EmptyTapeZone = styled.div`
  width: 88px;
  height: 54px;
  border-radius: 3px;
  background-color: ${theme.colors.black_900};
  opacity: 0.7;
`;

export const TapeName = styled.div<{ isEmpty?: boolean }>`
  margin-top: 6px;
  font-family: 'Ycomputer-Regular';
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.gray_700};
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: center;
`;

export const AlertBox = styled.div<{ isRecording: boolean }>`
  margin: 15px 0 14px 0;
  word-break: keep-all;

  div {
    ${({ isRecording }) =>
      isRecording
        ? `border-radius: 10px;
    background-color: ${theme.colors.gray_700};
    width: 100%;
    max-width: 178px;
    padding: 8px 16px;
    justify-content: center;
    color: ${theme.colors.gray_300};
    font-family: 'Pretendard-Regular';
    font-size: ${theme.fontSize.sm};
    font-weight: 500;
    line-height: 16px;
    margin: 0;

    &::after {
      top: -33px;
      right: 95px;
      position: relative;
      border-top: 0px solid transparent;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-bottom: 10px solid ${theme.colors.gray_700};
      content: '';
    }`
        : `height:36px`}
  }
`;

export const RotatingPath = styled.path`
  transform-origin: center center;
  animation: ${rotateAnimation} 2s linear infinite;
`;
