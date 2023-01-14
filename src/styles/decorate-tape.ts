import styled from '@emotion/styled';
import { decorateTapeProps } from 'pages/decorate-tape';

import theme from './theme';

export const DecoContainer = styled.div<decorateTapeProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Ycomputer-Regular';
  font-style: normal;

  h3,
  p {
    margin: 0;
    color: ${theme.colors.white};
    display: inline-block;
    font-weight: 400;
  }

  h3 {
    padding-top: 113px;
    text-align: center;
  }

  p {
    font-family: 'Pretendard-Regular';
    font-weight: 700;
    font-size: ${theme.fontSize.lg};
    padding: 20px 0 16px 0;
  }

  span {
    color: ${({ color }) => theme.colors[color]};
  }
`;

export const Text = styled.div`
  display: flex;
  width: 100%;
  padding-left: 24px;
  max-width: 245px;
`;

export const DecoZone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-align: 'center';
`;
