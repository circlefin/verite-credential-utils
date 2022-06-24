import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline"
import Tippy from "@tippyjs/react"
import clsx from "clsx"
import { useState } from "react"
import type { FC } from "react"
import toast from "react-hot-toast"

import { CredentialIssuer, CredentialVerifier } from "lib/constants"
import { formatDidKey, formatSecret } from "lib/credential-fns"

type Props = {
  issuer: CredentialIssuer | CredentialVerifier
}

const Issuer: FC<Props> = ({ issuer }) => {
  const [secretVisible, setSecretVisible] = useState(false)

  const copy = async (text: string) => {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(text)
    } else {
      document.execCommand("copy", true, text)
    }
    toast("Copied")
  }

  return (
    <>
      <li key={issuer.name} className="flex py-4 space-x-8">
        <div className="w-1/4">
          <p className="text-lg font-medium text-gray-900">{issuer.name}</p>
          {"isTrusted" in issuer && (
            <span
              className={clsx(
                "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
                issuer.isTrusted
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              )}
            >
              {issuer.isTrusted ? "Trusted" : "Untrusted"}
            </span>
          )}
        </div>
        <div className="flex flex-col space-y-2 overflow-hidden">
          <div>
            <p className="text-xs font-semibold tracking-wide text-gray-800 uppercase">
              Did Key
            </p>
            <Tippy content={<span className="text-lg">Click to copy</span>}>
              <p
                className="font-mono text-sm text-gray-500 cursor-pointer overflow-ellipsis hover:text-gray-800"
                onClick={(e) => {
                  e.preventDefault()
                  copy(issuer.did.key)
                }}
              >
                {formatDidKey(issuer.did.key)}
              </p>
            </Tippy>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-gray-800 uppercase">
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
                  <Tippy
                    content={<span className="text-lg">Click to copy</span>}
                  >
                    <span
                      className="cursor-pointer hover:text-gray-800"
                      onClick={(e) => {
                        e.preventDefault()
                        copy(issuer.did.secret)
                      }}
                    >
                      {formatSecret(issuer.did.secret)}
                    </span>
                  </Tippy>
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
