import type { NextPage } from "next"

import FAQ, { FAQType } from "components/FAQ"
import Issuer from "components/keys/issuer"
import { CREDENTIAL_ISSUERS, CREDENTIAL_VERIFIERS } from "lib/constants"

const faqs: FAQType[] = [
  {
    question: "What is this page?",
    answer:
      "This page provides the did:keys and secrets used for credential issuance and verification throughout this app."
  },
  {
    question: "Can I use these keys in production?",
    answer:
      "Absolutely not! These keys are shared by the world and are therefore considered compromised and unusable for any production use-case."
  },
  {
    question: "Why are you showing secrets?",
    answer:
      "This toolset is designed to help developers implement the Verite standard. By being able to consistently reproduce a credential as this service, developers are able to more accurately and quickly test their implementation."
  }
]

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

      <FAQ faqs={faqs} />
    </>
  )
}

export default Page
