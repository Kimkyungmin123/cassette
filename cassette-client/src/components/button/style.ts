import { css } from '@emotion/react';
import styled from '@emotion/styled';
import theme from 'styles/theme';

import { ButtonProps } from '.';

const mainButton = css`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.black_900};

  div {
    grid-gap: 8px;
  }
`;

const kakaoButton = css`
  background-color: ${theme.colors.login_kakao};
  justify-content: center;
  color: ${theme.colors.black_900};
  padding: 17.5px 0;
  position: relative;

  svg {
    position: absolute;
    left: 24.5px;
  }
`;

const geustButton = css`
  color: ${theme.colors.white};
`;

const clearButton = css`
  background-color: transparent;
  color: ${theme.colors.white};
`;

export const ButtonLayout = styled.div<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: ${theme.fontSize.md};
  border-radius: 50px;
  padding: 17.5px 0;
  font-weight: 700;
  line-height: 19px;
  max-height: 54px;
  font-family: 'Pretendard-Regular';
  background-color: ${({ color, variant }) =>
    variant === 'guest' ? color && theme.colors[color] : null};

  &:hover {
    cursor: pointer;
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
      case 'kakao':
        return kakaoButton;
      case 'guest':
        return geustButton;
      case 'clear':
        return clearButton;
      default:
        return mainButton;
    }
  }}
`;
