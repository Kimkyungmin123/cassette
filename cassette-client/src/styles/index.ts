import styled from '@emotion/styled';

import theme from './theme';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Ycomputer-Regular';
  font-style: normal;

  h1,
  h3,
  p {
    margin: 0;
    color: ${theme.colors.white};
    display: inline-block;
    width: 100%;
    font-weight: 400;
    text-align: center;
  }

  h1 {
    font-size: ${theme.fontSize.title};
    padding: 163px 0 10px 0;
  }

  h3 {
    font-size: ${theme.fontSize.lg};
  }

  p {
    line-height: 24px;
    font-size: ${theme.fontSize.lg};
  }
`;

export const Zone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-align: 'center';
`;
