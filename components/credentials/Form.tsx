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
  credentialType: CredentialType
  setCredentialType: (credentialType: CredentialType) => void
  issuer: CredentialIssuer
  setIssuer: (issuer: CredentialIssuer) => void
  status: CredentialStatus
  setStatus: (status: CredentialStatus) => void
}

const CredentialForm: FC<Props> = ({
  credentialType,
  setCredentialType,
  issuer,
  setIssuer,
  status,
  setStatus
}) => {
  return (
    <>
      <form>
        <div>
          <SelectBox
            label="Credential Type"
            items={CREDENTIAL_TYPES}
            selected={credentialType}
            setSelected={setCredentialType}
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
