import type { NextPage } from "next"

import Issuer from "components/keys/issuer"
import { CREDENTIAL_ISSUERS, CREDENTIAL_VERIFIERS } from "lib/credential-fns"

const Page: NextPage = () => {
  return (
    <>
      <div className="mt-10">
        <h3 className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
          Issuers
        </h3>
        <ul role="list" className="divide-y divide-gray-200">
          {CREDENTIAL_ISSUERS.map((issuer, i) => (
            <Issuer key={i} issuer={issuer} />
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <h3 className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
          Verifiers
        </h3>
        <ul role="list" className="divide-y divide-gray-200">
          {CREDENTIAL_VERIFIERS.map((verifier, i) => (
            <Issuer key={i} issuer={verifier} />
          ))}
        </ul>
      </div>
    </>
  )
}

export default Page
