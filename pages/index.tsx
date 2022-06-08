import { CogIcon, DownloadIcon } from "@heroicons/react/solid"
import Avatar from "boring-avatars"
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
  CREDENTIAL_TYPES,
  findCredentialIssuer,
  findCredentialStatus,
  findCredentialType
} from "lib/credential-fns"

const credentials = [
  {
    name: "Lindsay Walton",
    description: "Active Credential in good standing",
    credential: {
      type: findCredentialType("kycaml"),
      issuer: findCredentialIssuer("centre"),
      status: findCredentialStatus("approved")
    }
  },
  {
    name: "Courtney Henry",
    description: "Revoked Credential",
    credential: {
      type: findCredentialType("kycaml"),
      issuer: findCredentialIssuer("centre"),
      status: findCredentialStatus("revoked")
    }
  },
  {
    name: "Tom Cook",
    description: "Expired Credential",
    credential: {
      type: findCredentialType("kycaml"),
      issuer: findCredentialIssuer("centre"),
      status: findCredentialStatus("expired")
    }
  },
  {
    name: "Customize",
    description: "Pick custom attributes",
    credential: {
      type: findCredentialType("kycaml"),
      issuer: findCredentialIssuer("centre"),
      status: findCredentialStatus("approved")
    }
  }
]

const Page: NextPage = () => {
  const [selectedCredential, setSelectedCredential] = useState<
    typeof credentials[0] | null
  >()

  const [customType, setCustomType] = useState<CredentialType>(
    CREDENTIAL_TYPES[0]
  )
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
          KYC/AML Credentials
        </h3>
        <ul
          role="list"
          className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200"
        >
          {credentials.map((credential, i) => (
            <li
              key={i}
              className="flex flex-col py-4 space-x-3 cursor-pointer group"
            >
              <a
                className="flex items-center justify-between space-x-3"
                onClick={(e) => {
                  e.preventDefault()
                  credential === selectedCredential
                    ? setSelectedCredential(null)
                    : setSelectedCredential(credential)
                }}
              >
                <div className="flex items-center flex-1 min-w-0 space-x-3">
                  <div className="flex-shrink-0">
                    <Avatar
                      size={40}
                      name={credential.name}
                      variant="beam"
                      colors={[
                        "#5CACC4",
                        "#8CD19D",
                        "#CEE879",
                        "#FCB653",
                        "#FF5254"
                      ]}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {credential.name}
                    </p>
                    <p className="text-sm font-medium text-gray-500 truncate">
                      {credential.description}
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center px-3 py-2 space-x-2 bg-gray-100 border rounded-full group-hover:bg-gray-200">
                    {i === credentials.length - 1 ? (
                      <>
                        {" "}
                        <CogIcon
                          className="-ml-1 mr-0.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-medium text-gray-900">
                          Customize
                        </span>
                      </>
                    ) : (
                      <>
                        <DownloadIcon
                          className="-ml-1 mr-0.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-medium text-gray-900">
                          Download
                        </span>
                      </>
                    )}
                  </span>
                </div>
              </a>

              <AnimateHeight
                duration={250}
                easing="ease-in-out"
                animateOpacity={true}
                height={selectedCredential === credential ? "auto" : 0}
              >
                <div className="py-4">
                  {i === credentials.length - 1 ? (
                    <div className="flex flex-col space-x-2 space-y-2 sm:flex-row">
                      <div className="w-1/2">
                        <CredentialForm
                          credentialType={customType}
                          setCredentialType={setCustomType}
                          issuer={customIssuer}
                          setIssuer={setCustomIssuer}
                          status={customStatus}
                          setStatus={setCustomStatus}
                        />
                      </div>
                      <div className="w-1/2 text-right">
                        <QRCode
                          credentialType={customType}
                          issuer={customIssuer}
                          status={customStatus}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <QRCode
                        credentialType={credential.credential.type}
                        issuer={credential.credential.issuer}
                        status={credential.credential.status}
                      />
                    </div>
                  )}
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
