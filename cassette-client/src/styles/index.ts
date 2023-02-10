import styled from '@emotion/styled';

import theme from './theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Ycomputer-Regular';
  font-style: normal;
  padding: 0 24px;

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
    // figma상 163px인데 모바일로 보면 너무 길어서 임시 수정
    padding: 110px 0 10px 0;
  }

  h3 {
    font-size: ${theme.fontSize.lg};
  }

  p {
    line-height: 24px;
    font-size: ${theme.fontSize.lg};
  }
  svg {
    width: 100%;
  }
`;

export const Zone = styled.div`
  display: grid;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-align: 'center';
`;
