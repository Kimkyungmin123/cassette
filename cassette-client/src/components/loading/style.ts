import { css } from '@emotion/css';
import { keyframes } from '@emotion/react';
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

const dotScale1 = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1.0);
  }
`;

const dotScale2 = keyframes`
  30% {
    transform: scale(0);
  }
  0%{
    transform: scale(0.3);
  }
  100%{

    transform: scale(1.0);
  }
`;

const dotScale3 = keyframes`
  20%, 70%{
    transform: scale(0);
  }
  0%,100% {
    transform: scale(1.0);
  }
`;

const dotStyle = css`
  display: inline-block;
  margin: 0 5px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${theme.colors.white};
`;

export const DotStyle1 = styled.div`
  animation: ${dotScale1} 1.4s infinite ease-in-out both;
  ${dotStyle}
`;

export const DotStyle2 = styled.div`
  animation: ${dotScale2} 1.4s infinite ease-in-out both;
  ${dotStyle}
`;

export const DotStyle3 = styled.div`
  animation: ${dotScale3} 1.4s infinite ease-in-out both;
  ${dotStyle}
`;
