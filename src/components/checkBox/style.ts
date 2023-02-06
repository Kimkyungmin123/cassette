import styled from '@emotion/styled';
import theme from 'styles/theme';

export const CheckboxContainer = styled.div`
  display: flex;
  gap: 8px;
  font-family: 'Pretendard-Regular';
  font-size: ${theme.fontSize.ml};
  color: ${theme.colors.gray_50};
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
`;

export const CheckboxWrapper = styled.input`
  background-color: ${theme.colors.gray_600};
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 2px;
  cursor: pointer;

  &:checked {
    content: url(assets/check.svg);
  }
`;

export const CheckBoxLabel = styled.label`
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
`;
