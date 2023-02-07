import styled from '@emotion/styled';
import theme from 'styles/theme';

import { ListProps, SelectProps } from '.';

export const DropDownContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const SelectBox = styled.div<SelectProps>`
  display: flex;
  justify-content: space-between;
  padding: 10px 16px;
  background-color: ${theme.colors.black_800};
  color: ${({ selectContent }) =>
    selectContent ? theme.colors.gray_100 : theme.colors.gray_600};
  border-radius: ${({ isOpen }) => (isOpen ? '10px 10px 0 0 ' : '10px')};
  cursor: pointer;

  span {
    font-family: 'Pretendard-Regular';
    font-size: ${theme.fontSize.md};
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
  }
`;

export const WithdrawalList = styled.ul`
  position: absolute;
  list-style: none;
  margin: 0;
  padding: 0;
  color: ${theme.colors.gray_100};
  width: 100%;

  span {
    font-family: 'Pretendard-Regular';
    font-size: ${theme.fontSize.md};
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
  }
`;

export const ReasonBox = styled.div<ListProps>`
  display: flex;
  padding: 10px 16px;
  border-top: solid 1px ${theme.colors.gray_700};
  background-color: ${theme.colors.black_800};
  border-radius: ${({ isLastList }) => (isLastList ? '0 0 10px 10px' : null)};

  cursor: pointer;

  &:hover,
  &:active {
    background-color: ${theme.colors.gray_600};
  }
`;
