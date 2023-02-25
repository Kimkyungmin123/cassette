import { Global, ThemeProvider } from '@emotion/react';
import Layout from 'components/layout';
import ReactQueryWrapper from 'lib/reactQueryWrapper';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Suspense } from 'react';
import { global } from 'styles/globals';
import theme from 'styles/theme';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>cassette</title>
        <meta name="description" content="Generated by create next app" />
        <meta property="og:title" content="2023 Voice Tape" />
        <meta property="og:image" content="/ogImage.png" />
        <meta property="og:url" content="https://www.12playlist.com" />
        <meta
          property="og:description"
          content="평소 전하지 못했던 마음을
목소리로 담아보내요. "
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          href="favicons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="images/favicons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="favicons/apple-icon.png"></link>
        <meta name="msapplication-TileColor" content="#242729"></meta>
        <link
          href="splashscreens/iphone5_splash.png"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/iphone6_splash.png"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/iphoneplus_splash.png"
          media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/iphonex_splash.png"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/iphonexr_splash.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/iphonexsmax_splash.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/ipad_splash.png"
          media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/ipadpro1_splash.png"
          media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/ipadpro3_splash.png"
          media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="splashscreens/ipadpro2_splash.png"
          media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
      </Head>
      {/* <ReactQueryWrapper> */}
        <Suspense>
          <ThemeProvider theme={theme}>
            <Global styles={global} />
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <div id="modal" />
          </ThemeProvider>
        </Suspense>
      {/* </ReactQueryWrapper> */}
    </>
  );
};

export default App;
