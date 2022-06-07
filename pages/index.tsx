import { CogIcon, DownloadIcon } from "@heroicons/react/solid"
import Avatar from "boring-avatars"
import type { NextPage } from "next"
import { useState } from "react"
import AnimateHeight from "react-animate-height"

import CredentialForm from "components/credentials/Form"
import VeriteLogo from "components/icons/VeriteLogo"

const credentials = [
  {
    name: "Lindsay Walton",
    description: "Active Credential in good standing"
  },
  {
    name: "Courtney Henry",
    description: "Revoked Credential"
  },
  {
    name: "Tom Cook",
    description: "Expired Credential"
  },
  {
    name: "Customize",
    description: "Pick custom attributes"
  }
]

const Page: NextPage = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>()

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
            <li key={i} className="flex flex-col py-4 space-x-3">
              <a
                className="flex items-center justify-between space-x-3 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  i === selectedIndex
                    ? setSelectedIndex(null)
                    : setSelectedIndex(i)
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
                  <span className="inline-flex items-center px-3 py-2 space-x-2 bg-gray-100 border border-transparent rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
                height={selectedIndex === i ? "auto" : 0}
              >
                {i === credentials.length - 1 ? (
                  <div className="flex flex-col sm:flex-row">
                    <div>
                      <CredentialForm onSubmit={(e) => e.preventDefault()} />
                    </div>
                    <div>QR Code</div>
                  </div>
                ) : (
                  <div className="h-24">
                    <h2>show a QR code!</h2>
                  </div>
                )}
              </AnimateHeight>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Page
