import styled from '@emotion/styled';
import theme from 'styles/theme';

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;

  font-family: 'Pretendard-Regular';
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.gray_50};
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
`;

export const CheckboxWrapper = styled.input<{ isChecked: boolean }>`
  background-color: ${theme.colors.gray_600};
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 2px;
  cursor: pointer;
  margin-right: 8px;

  ${({ isChecked }) =>
    isChecked &&
    `
    &::after {
      content: url(assets/check.svg);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 23px;
      scale:0.9;
    }
  }
  `}
`;

export const CheckBoxLabel = styled.label`
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
`;
