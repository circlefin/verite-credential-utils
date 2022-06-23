import type { FC } from "react"

import SelectBox from "./form/SelectBox"

import {
  CredentialIssuer,
  CredentialStatus,
  CredentialType,
  CREDENTIAL_ISSUERS,
  CREDENTIAL_STATUSES,
  CREDENTIAL_TYPES
} from "lib/credential-fns"

type Props = {
  type: CredentialType
  setType: (type: CredentialType) => void
  issuer: CredentialIssuer
  setIssuer: (issuer: CredentialIssuer) => void
  status: CredentialStatus
  setStatus: (status: CredentialStatus) => void
}

const CredentialForm: FC<Props> = ({
  type,
  setType,
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
            label="Credential Type"
            items={CREDENTIAL_TYPES}
            selected={type}
            setSelected={setType}
          />
        </div>

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
