import { css } from '@emotion/react';
import styled from '@emotion/styled';
import theme from 'styles/theme';

import { ButtonProps } from '.';

const mainButton = css`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.black_900};
`;

const kakaoButton = css`
  background-color: ${theme.colors.login_kakao};
  justify-content: flex-start;
  color: ${theme.colors.black_900};
  padding: 15px 0;

  div {
    padding-left: 24px;
    gap: 72px;
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
  max-width: 327px;
  font-size: ${theme.fontSize.md};
  border-radius: 50px;
  padding: 17.5px 0;
  font-weight: 700;
  line-height: 19px;
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
