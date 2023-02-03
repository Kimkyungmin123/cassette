import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import theme from 'styles/theme';

import { NavBarProps } from '.';

interface ContainerProps extends Omit<NavBarProps, 'name' | 'isOpen'> {
  status: string | null;
}

export const openAnimation = keyframes`
  from {
    transform: translateX(100%);
    
  }
  to {
    transform: translateX(0%);
  }
`;

export const closeAnimation = keyframes`
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(100%);
    
  }
`;

export const NavContainer = styled.div<ContainerProps>`
  position: fixed;
  display: none;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  max-width: 280px;
  background-color: ${theme.colors.black_900};
  display: flex;
  flex-direction: column;
  color: ${theme.colors.white};
  padding: 100px 24px 0 24px;
  z-index: 10;

  ${({ status }) => {
    switch (status) {
      case 'open':
        return css`
          animation: ${openAnimation} 1s ease;
        `;
      case 'close':
        return css`
          animation: ${closeAnimation} 1s ease forwards;
        `;

      default:
        return css`
          display: none;
        `;
    }
  }};

  h3 {
    display: flex;
    margin: 0;
    font-family: 'Ycomputer-Regular';
    font-weight: 400;
    line-height: 20px;
    font-size: ${theme.fontSize.lg};
  }

  span {
    font-family: 'Pretendard-Regular';
    font-weight: 500;
    font-size: ${theme.fontSize.md};
  }
`;

export const CloseZone = styled.div`
  display: inline;
  padding: 10px;
  cursor: pointer;
`;

export const LoginStatus = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;

  span {
    color: ${theme.colors.gray_400};
    font-weight: 500;
    font-size: ${theme.fontSize.sm};
    padding-left: 6px;
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 32px 0 358px 0;
  margin: 0;

  li {
    display: flex;
    align-items: center;
    padding-bottom: 16px;
    color: ${theme.colors.white};
  }

  span {
    padding-left: 12px;
  }
`;

export const Bar = styled.div`
  border: solid 2px ${theme.colors.black_800};
`;

export const Bottom = styled.div`
  span {
    padding-left: 12px;
  }
`;

export const LogoutLi = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0 104px 12px;
`;
