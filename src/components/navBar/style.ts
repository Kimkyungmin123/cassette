import styled from '@emotion/styled';
import theme from 'styles/theme';

export const NavContainer = styled.div`
  width: 100%;
  max-width: 280px;
  background-color: ${theme.colors.black_900};
  display: flex;
  flex-direction: column;
  color: ${theme.colors.white};
  padding: 71px 24px 0 24px;

  h3 {
    margin: 0;
    padding-top: 10px;
    font-family: 'Ycomputer-Regular';
    font-weight: 400;
    line-height: 20px;
    font-size: ${theme.fontSize.lg};
  }

  span {
    font-family: 'Pretendard-Regular';
    font-weight: 500;
    font-size: ${theme.fontSize.md};
  }
`;

export const CloseZone = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 6px;
`;

export const LoginStatus = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;

  span {
    color: ${theme.colors.gray_400};
    font-weight: 500;
    font-size: ${theme.fontSize.sm};
    padding-left: 6px;
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 32px 0 358px 0;
  margin: 0;

  li {
    display: flex;
    align-items: center;
    padding-bottom: 16px;
  }

  span {
    padding-left: 12px;
  }
`;

export const Bar = styled.div`
  border: solid 2px ${theme.colors.black_800};
`;

export const Bottom = styled.div`
  a {
    display: flex;
    align-items: center;
    padding: 16px 0 104px 12px;
  }

  span {
    padding-left: 12px;
  }
`;
