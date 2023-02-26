import styled from '@emotion/styled';
import { ButtonLayout } from 'components/button/style';
import theme from 'styles/theme';

export const AudioCOntainer = styled.div<{ disabled: boolean }>`
  width: 100%;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const Audio = styled.audio``;

export const ProgressBar = styled.input`
  --movewidth: 0;

  appearance: none;
  background: ${theme.colors.gray_700};
  border-radius: 10px;
  position: relative;
  width: 100%;
  height: 2px;
  outline: none;
  margin: 0 8px;

  ::-webkit-slider-runnable-track {
    background: ${theme.colors.gray_700};
    border-radius: 10px;
    position: relative;
    width: 100%;
    height: 2px;
    outline: none;
  }

  ::-moz-focus-outer {
    border: 0;
  }

  &:before {
    content: '';
    height: 2px;
    width: var(--movewidth);
    background-color: ${theme.colors.gray_300};
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    cursor: pointer;
  }

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    display: none;
  }

  &:active::-webkit-slider-thumb {
    transform: scale(1.2);
  }
`;

export const PlayZone = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;

  span {
    font-family: 'Ycomputer-Regular';
    color: ${theme.colors.gray_300};
    font-style: normal;
    font-weight: 400;
    font-size: ${theme.fontSize.sm};
  }
`;

export const ButtonZone = styled.div<{ isGuest?: boolean }>`
  display: flex;
  width: ${({ isGuest }) => (isGuest ? '24px' : '100%')};
  margin: ${({ isGuest }) => (isGuest ? '0 1px 0 3px' : '16px 0 0 0')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PlaynPauseButton = styled(ButtonLayout)`
  width: 30px;
  height: 30px;
`;
