import styled from '@emotion/styled';
import theme from 'styles/theme';

export const LoadingCotainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  svg {
    padding-bottom: 16px;
  }
`;

export const TextContent = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.colors.white};

  span {
    padding-right: 6px;
    font-family: 'Ycomputer-regular';
    font-size: 24px;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: center;
  }

  div {
    margin-right: 6px;
    border-top: solid 3px;
    margin-top: 3px;
    width: 3px;
    height: 3px;
  }
`;
