import { css } from '@emotion/react';
import styled from '@emotion/styled';
import theme from 'styles/theme';

import { ButtonProps } from '.';

const mainButton = css`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.black_900};

  svg {
    padding-right: 8px;
  }

  :disabled {
    opacity: 55%;
  }
`;

const geustButton = css`
  color: ${theme.colors.white};

  :disabled {
    opacity: 0.5;
  }
`;

const clearButton = css`
  background-color: transparent;
  color: ${theme.colors.white};
`;

export const ButtonLayout = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: ${theme.fontSize.md};
  border-radius: 50px;
  padding: ${({ isLoading }) => (isLoading ? '13px 0' : '17.5px 0')};
  font-weight: 700;
  line-height: 19px;
  max-height: 54px;
  font-family: 'Pretendard-Regular';
  background-color: ${({ color, variant }) =>
    variant === 'guest' ? color && theme.colors[color] : null};

  &:hover {
    cursor: ${({ disabled }) => (disabled ? 'default' : ' pointer')};
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    word-break: keep-all;
  }

  span {
    width: 100%;
    display: inline;
  }

  ${({ variant }) => {
    switch (variant) {
      case 'main':
        return mainButton;
      case 'guest':
        return geustButton;
      case 'clear':
        return clearButton;
      default:
        return mainButton;
    }
  }}
`;

export const KaKaoButtonLayout = styled.div<{ isLoading: boolean }>`
  display: flex;
  justify-content: center;
  padding: 17.5px 0;
  position: relative;
  align-items: center;
  width: 100%;
  background-color: ${theme.colors.login_kakao};
  color: ${theme.colors.black_900};
  font-size: ${theme.fontSize.md};
  border-radius: 50px;
  padding: ${({ isLoading }) => (isLoading ? '13px 0' : '17.5px 0')};
  font-weight: 700;
  line-height: 19px;
  max-height: 54px;
  font-family: 'Pretendard-Regular';

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    word-break: keep-all;
  }

  ${({ isLoading }) =>
    !isLoading &&
    `span {
    width: 100%;
    display: inline;
  }

  svg {
    position: absolute;
    left: 24.5px;
    max-width: 100px;
  }`}
`;
