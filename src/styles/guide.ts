import styled from '@emotion/styled';
import { ButtonLayout } from 'components/button/style';

import theme from './theme';

export const GuideContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;

  h1,
  h2,
  p,
  ol {
    margin: 0;
    color: ${theme.colors.white};
    font-family: 'Pretendard-regular';
    align-items: center;
    font-weight: 400;
  }

  div:first-of-type {
    h1 {
      font-family: 'Ycomputer-regular';
      font-size: ${theme.fontSize.xl};
    }
  }
`;

export const CloseZone = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 71px;

  svg {
    cursor: pointer;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 0 32px 0;
`;

export const ContentZone = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 326px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: start;

  div {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  h2 {
    font-weight: 600;
    font-size: ${theme.fontSize.md};
  }

  p,
  ol {
    color: ${theme.colors.gray_300};
    font-size: ${theme.fontSize.smd};
    line-height: 24px;
  }

  ol {
    padding-left: 20px;
  }
`;

export const GuideButton = styled(ButtonLayout)`
  background-color: ${theme.colors.black_800};
  color: ${theme.colors.primary};
  font-size: ${theme.fontSize.smd};
  border-radius: 10px;
  padding: 10px 0;

  div {
    gap: 8px;
    color: ${theme.colors.primary};
  }
`;
