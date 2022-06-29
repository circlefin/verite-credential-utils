import { fullURL } from "lib/url-fns"

export const descriptor = {
  id: "kybaml-output-descriptor",
  schema: [
    {
      uri: fullURL("/api/schemas/KYBPAMLAttestation")
    }
  ],
  name: "Proof of Know Your Business Partner and Anti-Money Laundering",
  description:
    "Attestation that the issuer has completed KYBP/AML verification for this subject",
  display: {
    title: {
      text: "KYBP / AML Attestation"
    },
    subtitle: {
      path: ["$.KYBPAMLAttestation.approvalDate"],
      fallback: "Includes date of approval"
    },
    description: {
      text: "The KYBP authority processes Know Your Business Partner and Anti-Money Laundering analysis, potentially employing a number of internal and external vendor providers."
    },
    properties: [
      {
        label: "Process",
        path: ["$.KYBPAMLAttestation.process"],
        schema: { type: "string" }
      },
      {
        label: "Approved At",
        path: ["$.KYBPAMLAttestation.approvalDate"],
        schema: {
          type: "string",
          format: "date-time"
        }
      }
    ]
  }
}
