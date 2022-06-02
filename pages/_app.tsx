import "../styles/globals.css"
import { DefaultSeo } from "next-seo"
import type { AppProps } from "next/app"
import Head from "next/head"
import { FC } from "react"

import Layout from "components/layout/Layout"

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DefaultSeo
        title="Credential Faucet"
        titleTemplate="%s | Verite"
        description="Generate sample Verite credentials in different states to simplify testing your Verite integration."
        openGraph={{
          type: "website",
          url: "https://faucet.verite.centre.io",
          site_name: "Verite Credential Faucet"
        }}
      />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default App
