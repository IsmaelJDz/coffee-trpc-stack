import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render(): JSX.Element {
    return (
      <Html lang="es">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;600;700&display=swap"
            rel="stylesheet"
          />

          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="portal" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
