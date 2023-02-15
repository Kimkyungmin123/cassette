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
  top: 40px;
  right: 26px;
  svg {
    cursor: pointer;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  padding: 100px 20px 32px 0;

  h1 {
    font-family: 'Ycomputer-Regular';
    font-size: ${theme.fontSize.xxl};
    padding-left: 6px;
  }
`;

export const ContentZone = styled.div`
  display: grid;
  flex-direction: column;
  gap: 24px;
  max-width: 326px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;

  div {
    display: flex;
    align-items: center;
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
    padding-right: 8px;
  }
`;

export const GuideButton = styled(ButtonLayout)`
  background-color: ${theme.colors.black_800};
  color: ${theme.colors.primary};
  font-size: ${theme.fontSize.smd};
  border-radius: 10px;
  padding: 10px 0;

  div {
    display: flex;
    align-items: center;
    color: ${theme.colors.primary};
  }
`;
