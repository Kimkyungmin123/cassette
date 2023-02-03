import styled from '@emotion/styled';

export const MenuLayoutContainer = styled.div`
  position: relative;
`;

export const MenuContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const IconContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  top: 71px;
  right: 26px;
  width: 100%;
  div {
    cursor: pointer;
    padding: 10px;
    max-width: 30px;
    margin: 0;
  }
`;
