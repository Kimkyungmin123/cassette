import styled from '@emotion/styled';
import theme from 'styles/theme';

export const TextareaContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  background-color: ${theme.colors.black_800};
  color: ${theme.colors.gray_600};
  padding: 10px 16px;
  min-height: 200px;
  border-radius: 10px;
`;

export const TextareaWrapper = styled.textarea`
  width: 100%;
  min-height: 172px;
  height: 100%;
  background-color: ${theme.colors.black_800};
  font-family: 'Pretendard-Regular';
  font-size: ${theme.fontSize.ml};
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  border-radius: '10px';
  overflow: hidden;
`;

export const LimitText = styled.span`
  display: flex;
  justify-content: flex-end;
  color: ${theme.colors.gray_600};
  font-family: 'Pretendard-Regular';
  font-size: ${theme.fontSize.ml};
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
`;
