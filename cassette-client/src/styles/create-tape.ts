import styled from '@emotion/styled';
import { ButtonProps } from 'components/button';
import { ButtonLayout } from 'components/button/style';
import theme from 'styles/theme';

export const Box = styled.div<{ margin?: string }>`
  margin: ${({ margin }) => margin && margin};
`;

export const InputBox = styled.div`
  margin-bottom: 32px;
`;

export const Info = styled.span`
  display: block;
  text-align: left;
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.gray_600};
  margin-top: 8px;
  padding-bottom: 36px;
`;

export const CreateTapeInfoButton = styled(ButtonLayout)<ButtonProps>`
  width: 100%;
  background-color: ${({ disabled }) =>
    disabled ? theme.colors.disabled : theme.colors.primary};
`;
