import { DefaultTheme } from '@emotion/react';

const colors = {
  primary: '#FFFFE0', //   main_color

  black: '#000000',
  black_900: '#212121',
  black_800: '#424242',
  gray_700: '#616161',
  gray_600: '#757575',
  gray_500: '#9E9E9E',
  gray_400: '#BDBDBD',
  gray_300: '#E0E0E0',
  gray_200: '#EEEEEE',
  gray_100: '#F5F5F5',
  gray_50: '#FAFAFA',
  white: '#FFFFFF',
  mint: '#4DFFEB',

  color_pallet: '#FCFCEE',
  login_kakao: '#FEE500',
  disabled: '#9C9C89', // main_50%
  warning_red: '#B91919',
  record_red: '#CD0E00',

  // cassette color
  cassette_orange: '#DA7433',
  cassette_tangerine: '#E9A133',
  cassette_pink: '#F57797',
  cassette_darkpink: '#D25860',
  cassette_purple: '#8C5488',
  cassette_green: '#ACB21B',
  cassette_olive: '#7C810B',
  cassette_mint: '#3ABEAB',
  cassette_blue: '#74A3B5',
  cassette_red: '#A7412E',
};

const fontSize = {
  title: '28px',
  xl: '24px',
  lg: '20px',
  md: '16px',
  smd: '15px',
  sm: '14px',
  xs: '12px',
};

export type ColorsTypes = typeof colors;
export type FontTypes = typeof fontSize;

const theme: DefaultTheme = {
  colors,
  fontSize,
};

export default theme;
