import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import type { FC, ReactNode } from "react"

import VeriteLogo from "components/icons/VeriteLogo"

type Props = {
  children?: ReactNode
}

const navigation = [
  { name: "Credential Faucet", href: "/" },
  { name: "Verifier", href: "/verifier" },
  { name: "Keys", href: "/keys" }
]

const Layout: FC<Props> = ({ children }) => {
  const router = useRouter()

  return (
    <div className="max-w-3xl px-4 py-8 mx-auto">
      <header>
        <nav className="flex flex-row w-full text-sm text-center space-between">
          {navigation.map(({ name, href }) => (
            <Link href={href} key={href}>
              <a
                className={clsx(
                  router.pathname === href ? "font-bold" : "",
                  "flex-1 hover:underline"
                )}
              >
                {name}
              </a>
            </Link>
          ))}
        </nav>

        <div className="mt-12">
          <VeriteLogo className="h-14" />
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
