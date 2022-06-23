import type { NextPage } from "next"
import { useState } from "react"

import QRCode from "components/credentials/QRCode"
import SelectBox from "components/credentials/form/SelectBox"
import {
  CredentialIssuer,
  CredentialStatus,
  CredentialType,
  CREDENTIAL_ISSUERS,
  CREDENTIAL_STATUSES,
  CREDENTIAL_TYPES
} from "lib/credential-fns"

const Page: NextPage = () => {
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
      <div className="max-w-lg mx-auto text-center">
        <h1 className="mt-2 text-xl font-medium text-gray-900">
          Credential Faucet
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          This faucet provides sample credentials in different states, by
          different issuers, to allow you to test your Verite integration.
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

                <div>
                  <SelectBox
                    label="Issuer"
                    items={CREDENTIAL_ISSUERS}
                    selected={customIssuer}
                    setSelected={setCustomIssuer}
                  />
                </div>

                <div>
                  <SelectBox
                    label="Status"
                    items={CREDENTIAL_STATUSES}
                    selected={customStatus}
                    setSelected={setCustomStatus}
                  />
                </div>
              </form>
            </div>
            <div className="text-right sm:w-1/2">
              <QRCode
                credentialType={customType}
                issuer={customIssuer}
                status={customStatus}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
