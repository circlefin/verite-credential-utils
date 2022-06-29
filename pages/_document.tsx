import Document, { Html, Head, Main, NextScript } from "next/document"

class AppDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en" className="antialiased">
        <Head />
        <body className="text-gray-800 bg-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default AppDocument
