import styled from '@emotion/styled';
import theme from 'styles/theme';

export const TitleWrapper = styled.h1`
  font-family: 'Ycomputer-Regular';
  color: ${theme.colors.white};
  font-size: ${theme.fontSize.lg};
  text-align: center;
  font-weight: 400;
`;

export const TitleName = styled.span`
  font-family: 'Ycomputer-Regular';
  color: ${({ color }) => color || theme.colors.mint};
  font-size: ${theme.fontSize.lg};
`;
