import { DownloadIcon } from "@heroicons/react/solid"
import { FC, FormEventHandler, useState } from "react"

import SelectBox, { SelectBoxItem } from "./form/SelectBox"

const CREDENTIAL_TYPES: SelectBoxItem[] = [
  {
    name: "KYC/AML Credential"
  },
  {
    name: "Credit Score"
  }
]

const ISSUERS: SelectBoxItem[] = [
  {
    name: "Centre",
    secondary: "Trusted"
  },
  {
    name: "Circle",
    secondary: "Trusted"
  },
  {
    name: "GetFakeCreds.com",
    secondary: "Untrusted"
  }
]

const STATUSES: SelectBoxItem[] = [
  {
    name: "Approved"
  },
  {
    name: "Pending"
  },
  {
    name: "Rejected"
  },
  {
    name: "Expired"
  },
  {
    name: "Revoked"
  }
]

type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>
}

const CredentialForm: FC<Props> = ({ onSubmit }) => {
  const [credentialType, setCredentialType] = useState(CREDENTIAL_TYPES[0])
  const [issuer, setIssuer] = useState(ISSUERS[0])
  const [status, setStatus] = useState(STATUSES[0])

  return (
    <>
      <form onSubmit={onSubmit}>
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
            items={ISSUERS}
            selected={issuer}
            setSelected={setIssuer}
          />
        </div>

        <div>
          <SelectBox
            label="Status"
            items={STATUSES}
            selected={status}
            setSelected={setStatus}
          />
        </div>

        <div>
          <button
            type="submit"
            className="inline-flex items-center px-3 py-2 space-x-2 bg-gray-100 border border-transparent rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <DownloadIcon
              className="-ml-1 mr-0.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <span className="text-sm font-medium text-gray-900">Download</span>
          </button>
        </div>
      </form>
    </>
  )
}

export default CredentialForm
