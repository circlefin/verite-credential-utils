import type { FC } from "react"

import SelectBox from "./form/SelectBox"

import {
  CredentialIssuer,
  CredentialStatus,
  CREDENTIAL_ISSUERS,
  CREDENTIAL_STATUSES
} from "lib/credential-fns"

type Props = {
  issuer: CredentialIssuer
  setIssuer: (issuer: CredentialIssuer) => void
  status: CredentialStatus
  setStatus: (status: CredentialStatus) => void
}

const CredentialForm: FC<Props> = ({
  issuer,
  setIssuer,
  status,
  setStatus
}) => {
  return (
    <>
      <form className="flex flex-col space-y-4">
        <div>
          <SelectBox
            label="Issuer"
            items={CREDENTIAL_ISSUERS}
            selected={issuer}
            setSelected={setIssuer}
          />
        </div>

        <div>
          <SelectBox
            label="Status"
            items={CREDENTIAL_STATUSES}
            selected={status}
            setSelected={setStatus}
          />
        </div>
      </form>
    </>
  )
}

export default CredentialForm
