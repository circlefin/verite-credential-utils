import Tippy from "@tippyjs/react"
import QRCodeReact from "qrcode.react"
import { FC, useMemo } from "react"
import { challengeTokenUrlWrapper } from "verite"

import {
  CredentialIssuer,
  CredentialStatus,
  CredentialType
} from "lib/credential-fns"

type Props = {
  credentialType: CredentialType
  issuer: CredentialIssuer
  status: CredentialStatus
}

const QRCode: FC<Props> = ({ credentialType, issuer, status }) => {
  const challenge = useMemo(() => {
    return challengeTokenUrlWrapper(
      `${process.env.NEXT_PUBLIC_HOST}/api/credentials?type=${credentialType.id}&issuer=${issuer.id}&status=${status.id}`
    )
  }, [credentialType, issuer, status])

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <Tippy
        content={
          <span className="text-lg">Scan this code with your Wallet</span>
        }
      >
        <div>
          <QRCodeReact
            value={JSON.stringify(challenge)}
            className="w-full"
            renderAs="svg"
          />
        </div>
      </Tippy>
      <input
        type="text"
        value={JSON.stringify(challenge)}
        readOnly
        className="w-48 font-mono text-xs rounded outline-none bg-gray-50"
      />
    </div>
  )
}

export default QRCode
