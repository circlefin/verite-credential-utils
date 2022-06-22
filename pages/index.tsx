import {
  FingerPrintIcon,
  IdentificationIcon,
  OfficeBuildingIcon,
  QrcodeIcon
} from "@heroicons/react/outline"
import { CogIcon } from "@heroicons/react/solid"
import clsx from "clsx"
import type { NextPage } from "next"
import { useState } from "react"
import AnimateHeight from "react-animate-height"

import CredentialForm from "components/credentials/Form"
import QRCode from "components/credentials/QRCode"
import {
  CredentialIssuer,
  CredentialStatus,
  CredentialType,
  CREDENTIAL_ISSUERS,
  CREDENTIAL_STATUSES,
  CREDENTIAL_TYPES
} from "lib/credential-fns"

const ICONS: Record<CredentialType["id"], JSX.Element> = {
  kycaml: <IdentificationIcon />,
  kybaml: <OfficeBuildingIcon />,
  address: <QrcodeIcon />,
  counterparty: <FingerPrintIcon />
}

const COLORS = [
  "bg-fuchsia-200",
  "bg-teal-200",
  "bg-indigo-200",
  "bg-green-200"
]

const Page: NextPage = () => {
  const [selectedCredentialType, setSelectedCredentialType] =
    useState<CredentialType | null>(null)

  const [customIssuer, setCustomIssuer] = useState<CredentialIssuer>(
    CREDENTIAL_ISSUERS[0]
  )
  const [customStatus, setCustomStatus] = useState<CredentialStatus>(
    CREDENTIAL_STATUSES[0]
  )

  return (
    <>
      <div className="text-center">
        <h1 className="mt-2 text-xl font-medium text-gray-900">
          Credential Faucet
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          This faucet provides sample credentials in different states, by
          different issuers, to allow you to test your Verite integration.
        </p>
      </div>
      <div className="mt-10">
        <h3 className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
          Credential Types
        </h3>
        <ul
          role="list"
          className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200"
        >
          {CREDENTIAL_TYPES.map((type, i) => (
            <li key={i} className="">
              <div className="flex flex-col space-x-3 cursor-pointer group">
                <a
                  className="flex items-center justify-between py-4 space-x-3 "
                  onClick={(e) => {
                    e.preventDefault()
                    type === selectedCredentialType
                      ? setSelectedCredentialType(null)
                      : setSelectedCredentialType(type)
                  }}
                >
                  <div className="flex items-center flex-1 min-w-0 space-x-3">
                    <div className="flex-shrink-0">
                      <div
                        className={clsx(
                          "flex items-center justify-center w-10 h-10 overflow-hidden rounded-full",
                          COLORS[i]
                        )}
                      >
                        <div className="w-6 h-6">{ICONS[type.id]}</div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {type.name}
                      </p>
                      <p className="text-sm font-medium text-gray-500 truncate">
                        {type.secondary}
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-3 py-2 space-x-2 bg-gray-100 border rounded-full group-hover:bg-gray-200">
                      <CogIcon
                        className="-ml-1 mr-0.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        Customize
                      </span>
                    </span>
                  </div>
                </a>
              </div>

              <AnimateHeight
                duration={250}
                easing="ease-in-out"
                animateOpacity={true}
                height={selectedCredentialType === type ? "auto" : 0}
              >
                <div className="py-4">
                  <div className="flex flex-col space-x-2 space-y-2 sm:flex-row">
                    <div className="w-1/2">
                      <CredentialForm
                        issuer={customIssuer}
                        setIssuer={setCustomIssuer}
                        status={customStatus}
                        setStatus={setCustomStatus}
                      />
                    </div>
                    <div className="w-1/2 text-right">
                      <QRCode
                        credentialType={type}
                        issuer={customIssuer}
                        status={customStatus}
                      />
                    </div>
                  </div>
                </div>
              </AnimateHeight>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Page
