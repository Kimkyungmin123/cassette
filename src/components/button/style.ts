import { css } from '@emotion/react';
import styled from '@emotion/styled';
import theme from 'styles/theme';

import { ButtonProps } from '.';

const mainButton = css`
  background-color: ${theme.colors.secondary};
`;

const kakaoButton = css`
  background-color: ${theme.colors.kakaobtn};
`;

const geustButton = css`
  background-color: ${theme.colors.primary};
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
  padding: 18px 0;
  font-weight: 700;
  line-height: 19px;
  font-family: 'Pretendard-Regular';

  &:hover {
    cursor: pointer;
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
