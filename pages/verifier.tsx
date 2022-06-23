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

const VerifierPage: NextPage = () => {
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

  const qrCodeContents = useMemo(() => {
    const issuers = trustedIssuers.concat(customTrustedIssuer).filter(Boolean)
    return challengeTokenUrlWrapper(
      fullURL(
        `/api/verification-offer?type=${customType.id}&issuers=${issuers.join(
          ","
        )}`
      )
    )
  }, [customType, customTrustedIssuer, trustedIssuers])

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
              <form className="flex flex-col space-y-4">
                <div>
                  <SelectBox
                    label="Credential Type"
                    items={CREDENTIAL_TYPES}
                    selected={customType}
                    setSelected={setCustomType}
                  />
                </div>

                <fieldset className="space-y-5">
                  <legend className="block -mb-2 text-sm font-medium text-gray-700">
                    Trusted Issuers
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
