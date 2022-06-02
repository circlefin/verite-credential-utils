import Document, { Html, Head, Main, NextScript } from "next/document"

class AppDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en" className="h-full antialiased">
        <Head />
        <body className="h-full overflow-hidden text-gray-800 transition-colors duration-100 bg-white dark:bg-neutral-800 dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default AppDocument
