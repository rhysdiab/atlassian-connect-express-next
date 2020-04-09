import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class ConnectDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
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
        <Head>
          {this.getHostScript()}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
          <script
            src="https://connect-cdn.atl-paas.net/all.js"
            async
            data-options="sizeToParent:true"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
