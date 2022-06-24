import Tippy from "@tippyjs/react"
import { QRCodeSVG } from "qrcode.react"
import { FC, useState } from "react"

import ClientSideOnly from "components/layout/ClientSideOnly"

type Props = {
  contents: Record<string, unknown>
  link?: string
}

const QRCode: FC<Props> = ({ contents, link }) => {
  const [showContents, setShowContents] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <Tippy
        content={
          <span className="text-lg">Scan this code with your Wallet</span>
        }
      >
        <div>
          <a href={link} target="_blank" rel="noreferrer">
            <ClientSideOnly>
              <QRCodeSVG
                value={JSON.stringify(contents)}
                className="w-52 h-52"
              />
            </ClientSideOnly>
          </a>
        </div>
      </Tippy>

      {showContents ? (
        <>
          <textarea
            readOnly
            className="flex-wrap h-48 font-mono text-xs rounded outline-none w-52 bg-gray-50"
            value={JSON.stringify(contents)}
          />
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
