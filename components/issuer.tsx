import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline"
import React, { useState } from "react"
import type { FC, ReactNode } from "react"

import { formatDidKey, formatSecret, ISSUERS } from "lib/credential-fns"

type Props = {
  issuer: typeof ISSUERS[0]
}

const Issuer: FC<Props> = ({ issuer }) => {
  const [secretVisible, setSecretVisible] = useState(false)

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    alert("Text copied")
  }

  return (
    <>
      <li key={issuer.name} className="flex py-4 space-x-8">
        <div>
          <p className="text-lg font-medium text-gray-900">{issuer.name}</p>
        </div>
        <div className="flex flex-col space-y-2 overflow-hidden">
          <div>
            <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
              Did Key
            </p>
            <p
              className="font-mono text-sm text-gray-500 cursor-pointer overflow-ellipsis hover:text-gray-800"
              onClick={(e) => {
                e.preventDefault()
                copy(issuer.did.key)
              }}
            >
              {formatDidKey(issuer.did.key)}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
              Secret
            </p>
            <div className="flex items-center space-x-2 font-mono text-sm text-gray-500 overflow-ellipsis">
              <button
                className="p-1 rounded cursor-pointer hover:bg-gray-200"
                onClick={(e) => {
                  e.preventDefault()
                  setSecretVisible(!secretVisible)
                }}
              >
                {secretVisible ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>

              <p className="flex">
                {secretVisible ? (
                  <span
                    className="cursor-pointer hover:text-gray-800"
                    onClick={(e) => {
                      e.preventDefault()
                      copy(issuer.did.secret)
                    }}
                  >
                    {formatSecret(issuer.did.secret)}
                  </span>
                ) : (
                  <span>•••••••••••••••</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </li>
    </>
  )
}

export default Issuer
