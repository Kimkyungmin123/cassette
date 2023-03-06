import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import theme from 'styles/theme';

export const toastAnimation = keyframes`

  from {
    transform: translateY(20%);
  }
  to {
    transform: translateX(0%);
  }


`;

export const ToastBox = styled.div`
  background-color: ${theme.colors.gray_700};
  opacity: 0.95;
  color: ${theme.colors.white};
  font-size: ${theme.fontSize.md};
  font-family: 'Pretendard-Regular';
  border-radius: 10px;
  font-weight: 600;
  padding: 12px 16px;
  animation: ${toastAnimation} 0.4s ease;
`;

export const Content = styled.div`
  display: flex;
  word-break: keep-all;
  justify-content: center;
  align-items: center;
  svg {
    padding-right: 8px;
  }
`;
