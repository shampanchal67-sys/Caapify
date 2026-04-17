import '../styles/globals.css';
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* ✅ Google AdSense Script (global) */}
      <Script
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2767067515142068"
        crossOrigin="anonymous"
      />

      <Component {...pageProps} />
    </>
  );
}