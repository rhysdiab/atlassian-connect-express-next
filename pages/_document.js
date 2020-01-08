import Document, { Html, Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';

export default class ConnectDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  getHostScript() {
    const nextData = this.props.__NEXT_DATA__;
    if (nextData && nextData.query && nextData.query.hostScriptUrl) {
      return <script src={nextData.query.hostScriptUrl} type="text/javascript" />;
    }
  }

  render() {
    return (
      <Html>
        <Head>{this.getHostScript()}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
