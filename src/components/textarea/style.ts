import styled from '@emotion/styled';
import theme from 'styles/theme';

import { TextType } from '.';

export const TextareaContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${theme.colors.black_800};
  padding: 10px 16px;
  min-height: 200px;
  border-radius: 10px;
`;

export const TextareaWrapper = styled.textarea<TextType>`
  min-height: 172px;
  height: 100%;
  background-color: ${theme.colors.black_800};
  color: ${({ value }) =>
    value ? theme.colors.gray_100 : theme.colors.gray_600};

  font-family: 'Pretendard-Regular';
  font-size: ${theme.fontSize.md};
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  border-radius: '10px';
  overflow: hidden;
  &:focus {
    outline: none;
  }
`;

export const LimitText = styled.span`
  display: flex;
  justify-content: flex-end;
  color: ${theme.colors.gray_600};
  font-family: 'Pretendard-Regular';
  font-size: ${theme.fontSize.md};
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
`;
