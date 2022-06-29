import { fullURL } from "lib/url-fns"

export const descriptor = {
  id: "kycaml-output-descriptor",
  schema: [
    {
      uri: fullURL("/api/schemas/KYCAMLAttestation")
    }
  ],
  name: "Proof of Know Your Customer and Anti-Money Laundering",
  description:
    "Attestation that the issuer has completed KYC/AML verification for this subject",
  display: {
    title: {
      text: "KYC / AML Attestation"
    },
    subtitle: {
      path: ["$.KYCAMLAttestation.approvalDate"],
      fallback: "Includes date of approval"
    },
    description: {
      text: "The KYC authority processes Know Your Customer and Anti-Money Laundering analysis, potentially employing a number of internal and external vendor providers."
    },
    properties: [
      {
        label: "Process",
        path: ["$.KYCAMLAttestation.process"],
        schema: { type: "string" }
      },
      {
        label: "Approved At",
        path: ["$.KYCAMLAttestation.approvalDate"],
        schema: {
          type: "string",
          format: "date-time"
        }
      }
    ]
  }
}
