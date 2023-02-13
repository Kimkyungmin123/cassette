import styled from '@emotion/styled';

import theme from './theme';

export const DecoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Ycomputer-Regular';
  font-style: normal;
  padding: '0 24px';
  h3,
  p {
    margin: 0;
    color: ${theme.colors.white};
    display: inline-block;
    font-weight: 400;
  }

  h3 {
    text-align: center;
  }

  p {
    text-align: start;
    font-family: 'Pretendard-Regular';
    font-weight: 700;
    font-size: ${theme.fontSize.lg};
    padding: 20px 0 16px 0;
    width: 100%;
  }

  svg {
    width: 100%;
  }
`;

export const Middie = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const DecoZone = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 94px; //136px
`;
