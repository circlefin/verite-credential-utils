import Link from "next/link"
import React from "react"
import type { FC, ReactNode } from "react"

import VeriteLogo from "components/icons/VeriteLogo"

type Props = {
  children?: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="max-w-lg px-4 py-12 mx-auto">
      <header>
        <div className="text-center">
          <VeriteLogo className="h-14" />
          <h1 className="mt-2 text-xl font-medium text-gray-900">
            Credential Faucet
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            This faucet provides sample credentials in different states, by
            different issuers, to allow you to test your Verite integration.
          </p>
        </div>
      </header>

      <main className="">{children}</main>

      <footer className="my-10 text-xs text-center text-gray-500">
        &copy; {new Date().getFullYear()}{" "}
        <Link href="https://centre.io">
          <a className="transition-colors hover:underline hover:text-gray-800">
            Centre
          </a>
        </Link>
        .
      </footer>
    </div>
  )
}

export default Layout
