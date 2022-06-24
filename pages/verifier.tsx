import { InformationCircleIcon } from "@heroicons/react/solid"
import Tippy from "@tippyjs/react"
import { ethers } from "ethers"
import type { NextPage } from "next"
import { useMemo, useState } from "react"
import { challengeTokenUrlWrapper } from "verite"

import QRCode from "components/credentials/QRCode"
import SelectBox from "components/form/SelectBox"
import {
  CredentialIssuer,
  CredentialType,
  CREDENTIAL_ISSUERS,
  CREDENTIAL_TYPES
} from "lib/credential-fns"
import { fullURL } from "lib/url-fns"

declare global {
  interface Window {
    ethereum?: ethers.providers.ExternalProvider
  }
}

const VerifierPage: NextPage = () => {
  const [subjectAddress, setSubjectAddress] = useState<string>("")
  const [trustedIssuers, setTrustedIssuers] = useState<string[]>(
    CREDENTIAL_ISSUERS.filter((i) => i.isTrusted).map((i) => i.did.key)
  )
  const [customTrustedIssuer, setCustomTrustedIssuer] = useState<string>("")
  const [customType, setCustomType] = useState<CredentialType>(
    CREDENTIAL_TYPES[0]
  )

  const toggleTrustedIssuer = (issuer: CredentialIssuer) => {
    if (trustedIssuers.includes(issuer.did.key)) {
      setTrustedIssuers(trustedIssuers.filter((i) => i !== issuer.did.key))
    } else {
      setTrustedIssuers([issuer.did.key, ...trustedIssuers])
    }
  }

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", [])
      const signer = provider.getSigner()
      const address = await signer.getAddress()
      setSubjectAddress(address)
    }
  }

  const qrCodeContents = useMemo(() => {
    const issuers = trustedIssuers.concat(customTrustedIssuer).filter(Boolean)

    const params = new URLSearchParams({
      type: customType.id
    })

    if (issuers.length) {
      params.append("issuers", issuers.join(","))
    }

    if (subjectAddress.length) {
      params.append("subjectAddress", subjectAddress)
    }

    return challengeTokenUrlWrapper(
      fullURL(`/api/verification-offer?${params.toString()}`)
    )
  }, [customType, customTrustedIssuer, trustedIssuers, subjectAddress])

  return (
    <>
      <div className="max-w-lg mx-auto text-center">
        <h1 className="mt-2 text-xl font-medium text-gray-900">
          Sample Verifier
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          This sample verifier allows you to test the verification flows of your
          Verite integration. Choose from an existing set of issuers to trust,
          or enter a custom one.
        </p>
      </div>
      <div className="mt-10">
        <div className="py-4">
          <div className="flex flex-col-reverse space-x-2 space-y-2 sm:flex-row">
            <div className="sm:w-1/2">
              <form className="flex flex-col space-y-8">
                <div>
                  <SelectBox
                    label="Credential Type"
                    labelTooltip="Pick the type of credential that will be required for verification"
                    items={CREDENTIAL_TYPES}
                    selected={customType}
                    setSelected={setCustomType}
                  />
                </div>

                <fieldset className="space-y-4">
                  <legend className="block -mb-2 text-sm font-medium text-gray-700">
                    <span className="flex items-center space-x-2">
                      <span>Trusted Issuers</span>

                      <Tippy content="Select the issuer(s) that your verifier should trust, or type a custom one. If none are selected, all issuers will be trusted.">
                        <InformationCircleIcon className="w-4 h-4 text-gray-400" />
                      </Tippy>
                    </span>
                  </legend>
                  {CREDENTIAL_ISSUERS.map((issuer, i) => (
                    <div className="relative flex items-start" key={i}>
                      <label className="flex items-center h-5">
                        <input
                          type="checkbox"
                          onChange={() => {
                            toggleTrustedIssuer(issuer)
                          }}
                          checked={trustedIssuers.includes(issuer.did.key)}
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <div className="ml-3 text-sm">{issuer.name}</div>
                      </label>
                    </div>
                  ))}

                  <div className="relative flex items-start cursor-pointer">
                    <div className="flex items-center w-full h-5">
                      <input
                        type="checkbox"
                        checked={customTrustedIssuer?.length > 0}
                        readOnly
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <div className="w-full ml-3 text-sm">
                        <input
                          type="text"
                          value={customTrustedIssuer}
                          onChange={(e) => {
                            setCustomTrustedIssuer(e.target.value)
                          }}
                          className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                          placeholder="Custom did:key"
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>

                <div className="">
                  <label
                    htmlFor="wallet"
                    className="flex justify-between text-sm font-medium text-gray-700"
                  >
                    <span className="flex items-center space-x-2">
                      <span>Wallet Address</span>

                      <Tippy content="If you specify an address, the verifier will return a VerificationResult for submission to the blockchain">
                        <InformationCircleIcon className="w-4 h-4 text-gray-400" />
                      </Tippy>
                    </span>

                    <span className="font-light text-gray-400">Optional</span>
                  </label>
                  <div className="flex mt-1 rounded-md shadow-sm">
                    <div className="relative flex items-stretch flex-grow focus-within:z-10">
                      <input
                        type="text"
                        name="wallet"
                        id="wallt"
                        value={subjectAddress}
                        onChange={(e) => setSubjectAddress(e.target.value)}
                        autoComplete="crypto"
                        className="block w-full border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-l-md sm:text-sm"
                        placeholder="0x"
                      />
                    </div>
                    <button
                      type="button"
                      className="relative inline-flex items-center px-4 py-2 -ml-px space-x-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                      onClick={(e) => {
                        e.preventDefault()
                        connectWallet()
                      }}
                    >
                      <span>Connect Wallet</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="text-right sm:w-1/2">
              <QRCode
                contents={qrCodeContents}
                link={qrCodeContents.challengeTokenUrl}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default VerifierPage
