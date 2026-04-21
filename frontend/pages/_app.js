import '../styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Adsense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2767067515142068"
          crossOrigin="anonymous"
        ></script>

        {/* ✅ Impact Verification */}
        <meta
          name="Impact-Site-Verification"
          content="16ee40fc-8d3b-4f9f-8174-81d70d7083d4"
        />
      </Head>

      <Component {...pageProps} />
    </>
  );
}