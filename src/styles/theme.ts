import { DefaultTheme } from '@emotion/react';

const colors = {
  primary: '#DA7433', // cassette orange
  secondary: '#FFFFE0', // main button
  tertiary: '#FCFCEE',

  kakaobtn: '#FFE54A',
  disabled: '#9C9C89',
  input: '#424242',

  // font color
  white: '#FFFFFF',
  mint: '#4DFFEB',
  black: '#000000',
  gray: '#757575', // 600
  lightgray: '#BDBDBD', // 400

  // cassette color
  cassette_orange: '#DA7433',
  tangerine: '#E9A133',
  pink: '#F57797',
  deep_pink: '#D25860',
  purple: '#8C5488',
  light_green: '#ACB21B',
  olive: '#7C810B',
  emerald: '#3ABEAB',
  ceruleanblue: '#74A3B5',
  brown: '#A7412E',
};

const fontSize = {
  title: '28px',
  xl: '24px',
  lg: '20px',
  md: '16px',
  sm: '14px',
  xs: '12px',
  xxs: '6px',
};

export type ColorsTypes = typeof colors;
export type FontTypes = typeof fontSize;

const theme: DefaultTheme = {
  colors,
  fontSize,
};

export default theme;
