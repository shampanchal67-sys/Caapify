import '../styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2767067515142068"
          crossOrigin="anonymous"
        ></script>
      </Head>

      <Component {...pageProps} />
    </>
  );
}