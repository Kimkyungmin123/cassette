import { Global, ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { global } from 'styles/globals';
import theme from 'styles/theme';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Global styles={global} />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default App;
