import styled from '@emotion/styled';
import { ButtonLayout } from 'components/button/style';

import theme from './theme';

export const GuideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 75px;

  h1,
  h2,
  p,
  ol {
    margin: 0;
    color: ${theme.colors.white};
    font-family: 'Pretendard-Regular';
    align-items: center;
    font-weight: 400;
  }
`;

export const CloseZone = styled.div`
  position: absolute;
  top: 71px;
  right: 26px;
  svg {
    cursor: pointer;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  justify-content: center;
  padding: 16px 20px 32px 0;

  h1 {
    font-family: 'Ycomputer-Regular';
    font-size: ${theme.fontSize.xl};
  }
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

  svg {
    height: 26px;
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
