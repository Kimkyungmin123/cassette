import styled from '@emotion/styled';
import { ButtonLayout } from 'components/button/style';

import theme from './theme';

export const Container404 = styled.div`
  color: ${theme.colors.white};
  margin: 202px 24px 0 24px;

  h1,
  p {
    font-family: 'Ycomputer-Regular';
    font-size: ${theme.fontSize.xl};
    font-weight: 400;
    line-height: 25px;
    letter-spacing: 0em;
    text-align: center;
  }

  h1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  p {
    margin: 16px 0 64px 0;
  }

  svg {
    padding-bottom: 16px;
  }
`;

export const ButtonZone = styled.div`
  display: grid;
  grid-gap: 16px;
`;

export const RedirectButton = styled(ButtonLayout)`
  font-family: 'Pretendard-Regular';
  font-size: ${theme.fontSize.md};
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  border: solid 1px ${theme.colors.gray_400}; ;
`;
