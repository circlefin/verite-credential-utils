import Tippy from "@tippyjs/react"
import Link from "next/link"
import { QRCodeSVG } from "qrcode.react"
import { FC, useMemo, useState } from "react"
import { challengeTokenUrlWrapper } from "verite"

import ClientSideOnly from "components/layout/ClientSideOnly"
import {
  CredentialIssuer,
  CredentialStatus,
  CredentialType
} from "lib/credential-fns"
import { fullURL } from "lib/url-fns"

type Props = {
  credentialType: CredentialType
  issuer: CredentialIssuer
  status: CredentialStatus
}

const QRCode: FC<Props> = ({ credentialType, issuer, status }) => {
  const [showContents, setShowContents] = useState(false)
  const challenge = useMemo(() => {
    return challengeTokenUrlWrapper(
      fullURL(
        `/api/credential-offer?type=${credentialType.id}&issuer=${issuer.id}&status=${status.id}`
      )
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
          <Link href={challenge.challengeTokenUrl}>
            <a target="_blank">
              <ClientSideOnly>
                <QRCodeSVG
                  value={JSON.stringify(challenge)}
                  className="w-52 h-52"
                />
              </ClientSideOnly>
            </a>
          </Link>
        </div>
      </Tippy>

      {showContents ? (
        <>
          <textarea
            readOnly
            className="flex-wrap h-48 font-mono text-xs rounded outline-none w-52 bg-gray-50"
          >
            {JSON.stringify(challenge)}
          </textarea>
        </>
      ) : (
        <>
          <button
            className="text-sm text-gray-400 underline hover:text-gray-600"
            onClick={() => setShowContents(!showContents)}
          >
            Show Contents
          </button>
        </>
      )}
    </div>
  )
}

export default QRCode
