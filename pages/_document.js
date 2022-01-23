import Document, { Html, Head, Main, NextScript } from 'next/document';
import { getLangFromReq } from '../src/utils/fromReq';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const lang = getLangFromReq(ctx.req);
    return { ...initialProps, lang };
  }
  
  render() {
    return (
      <Html lang={this.props.lang}>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#fff" />
          <meta name="description" content="Website untuk mendukung penyelenggaraan kegiatan University Day di SMA Negeri 1 Kandanghaur"></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;