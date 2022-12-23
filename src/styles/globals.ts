import { css } from '@emotion/react';

export const global = css`
  html {
    box-sizing: border-box;
  }
  body {
    font-family: 'Noto Sans KR', sans-serif;
  }

  button,
  input,
  textarea {
    color: inherit;
    font-size: 100%;
    border: 0;
  }

  button {
    cursor: pointer;
    border: none;
  }

  a {
    text-decoration: none;
  }
`;
