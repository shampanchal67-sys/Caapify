import '../styles/globals.css';
import Head from 'next/head';

// Affiliate Products - Add your Amazon affiliate links here
export const products = [
  {
    name: "Ring Light",
    description: "Professional LED ring light for content creation",
    image: "https://m.media-amazon.com/images/I/41QiBHU7hhL._SY300_SX300_QL70_FMwebp_.jpg",
    link: "https://amzn.to/4mMf7wb",
    category: "Lighting"
  },
  {
    name: "Tripod Stand",
    description: "Adjustable tripod for camera and phone",
    image: "https://m.media-amazon.com/images/I/61LnPbT7KML._SY450_.jpg",
    link: "https://amzn.to/4mMf7wb", // Replace with your link
    category: "Accessories"
  },
  {
    name: "Microphone",
    description: "USB microphone for clear audio recording",
    image: "https://m.media-amazon.com/images/I/612ETE0GIHL._SL1500_.jpg",
    link: "https://amzn.to/4u2o2vQ", // Replace with your link
    category: "Audio"
  },
  {
    name: "Softbox Light",
    description: "Softbox lighting kit for photography",
    image: "https://m.media-amazon.com/images/I/51Pkq5U1GTL._SL1500_.jpg",
    link: "https://amzn.to/4cDTM3k", // Replace with your link
    category: "Lighting"
  }
];

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Caapify - AI Social Media Content Generator</title>
        <meta name="description" content="Generate viral captions, songs, and hashtags with AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
