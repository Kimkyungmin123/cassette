import styled from '@emotion/styled';
import theme from 'styles/theme';

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: ${theme.colors.black_800};
  border-radius: 10px;
`;

export const InputWrapper = styled.input`
  width: 100%;
  padding: 10px;
  background: ${theme.colors.black_800};
  color: ${theme.colors.white};
  border-radius: 10px 0 0 10px;
`;

export const LabeledInputContainer = styled.div`
  width: 100%;
`;

export const Label = styled.label`
  display: block;
  color: ${theme.colors.white};
  font-weight: 700;
  font-size: ${theme.fontSize.lg};
  margin-bottom: 16px;
  color: ${theme.colors.white};
  text-align: left;
`;

export const Highlights = styled.span<{ color?: string }>`
  color: ${({ color }) => color || theme.colors.cassette_mint};
`;

export const Length = styled.span`
  display: block;
  color: ${theme.colors.gray_600};
  width: 80px;
  text-align: center;
`;
