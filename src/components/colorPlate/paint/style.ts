import styled from '@emotion/styled';
import theme from 'styles/theme';

import { CircleProps } from '.';

export const Item = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const CircleStyle = styled.input<CircleProps>`
  z-index: 1;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: ${({ color }) => theme.colors[color]};

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }

  ${({ checked }) =>
    checked &&
    ` 
  &:checked {
    opacity: 1;
    cursor: default;

    &::after {
      content: url(assets/check.svg);;
      display: flex;
      padding: 10px      
    }
  }
`}
`;
