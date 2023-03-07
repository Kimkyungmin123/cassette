import styled from '@emotion/styled';
import { ButtonLayout } from 'components/button/style';

import theme from './theme';

export const GuideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  color: ${theme.colors.white};
  h2,
  p,
  ol {
    margin: 0;
    font-family: 'Pretendard-Regular';
    align-items: center;
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
  margin-bottom: 32px;

  h1 {
    color: ${theme.colors.white};
    font-family: 'Ycomputer-Regular';
    font-size: ${theme.fontSize.xxl};
    font-weight: 400;
    padding-left: 6px;
  }
`;

export const ContentZone = styled.div`
  display: grid;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  grid-gap: 24px;
  max-width: 326px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  width: 100%;

  div {
    display: flex;
    align-items: center;
  }

  h2 {
    font-weight: 600;
    font-size: ${theme.fontSize.md};
    padding-bottom: 12px;
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
    padding-bottom: 12px;
  }
`;

export const GuideButtonZone = styled.div`
  width: 100%;
  padding-bottom: 92px;
`;

export const GuideButton = styled(ButtonLayout)`
  background-color: ${theme.colors.black_800};
  color: ${theme.colors.primary};
  font-size: ${theme.fontSize.smd};
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 10px;

  div {
    width: 100%;
    display: flex;
    align-items: center;
    color: ${theme.colors.primary};
  }

  svg {
    padding: 0 0 0 12px;
  }
`;
