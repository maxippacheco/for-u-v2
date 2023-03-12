import { Html, Head, Main, NextScript } from 'next/document'
import Modal from 'react-modal';

Modal.setAppElement('#appModal');

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body id='appModal'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
