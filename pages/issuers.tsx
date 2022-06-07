import { EyeIcon } from "@heroicons/react/solid"
import type { NextPage } from "next"
import { useState } from "react"

import Issuer from "components/issuer"
import { ISSUERS } from "lib/credential-fns"

const Page: NextPage = () => {
  return (
    <>
      <div className="mt-10">
        <h3 className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
          Issuers
        </h3>
        <ul role="list" className="divide-y divide-gray-200">
          {ISSUERS.map((issuer, i) => (
            <Issuer key={i} issuer={issuer} />
          ))}
        </ul>
      </div>
    </>
  )
}

export default Page
