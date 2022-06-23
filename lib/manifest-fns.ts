import type {
  CredentialManifest,
  OutputDescriptor,
  PresentationDefinition
} from "verite"

import {
  CredentialIssuer,
  CredentialType,
  findCredentialType
} from "./credential-fns"

const PRESENTATION_DEFINITION: PresentationDefinition = {
  id: "PROOF_OF_CONTROL_PRESENTATION_DEF_ID",
  format: {
    jwt_vp: {
      alg: ["EdDSA"]
    }
  },
  input_descriptors: [
    {
      id: "proofOfIdentifierControlVP",
      name: "Proof of Control Verifiable Presentation",
      purpose:
        "A Verifiable Presentation establishing proof of identifier control over the DID.",
      schema: [
        {
          uri: "https://demos.verite.id/schemas/identity/1.0.0/ProofOfControl"
        }
      ]
    }
  ]
}

const OUTPUT_DESCRIPTORS: Record<CredentialType["id"], OutputDescriptor> = {
  kycaml: {
    id: `kycaml-output-descriptor`,
    schema: [
      {
        uri: "https://demos.verite.id/schemas/identity/1.0.0/KYCAMLAttestation"
      }
    ],
    name: "Proof of Know Your Customer and Anti-Money Laundering",
    description: `Attestation that the issuer has completed KYC/AML verification for this subject`,
    display: {
      title: {
        text: `KYC / AML Attestation`
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
  },

  kybaml: {
    id: `kybaml-output-descriptor`,
    schema: [
      {
        uri: "https://demos.verite.id/schemas/identity/1.0.0/KYBAMLAttestation"
      }
    ],
    name: "Proof of Know Your Business Partner and Anti-Money Laundering",
    description: `Attestation that the issuer has completed KYBP/AML verification for this subject`,
    display: {
      title: {
        text: `KYBP / AML Attestation`
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
  },
  address: {
    id: `address-output-descriptor`,
    schema: [
      {
        uri: "https://demos.verite.id/schemas/identity/1.0.0/AddressOwner"
      }
    ],
    name: "Proof of Address Ownership",
    description: `Attestation that the subject owns a given address`,
    display: {
      title: {
        text: `Address Ownership`
      },
      subtitle: {
        path: ["$.AddressOwner.address"],
        fallback: "Includes address"
      },
      description: {
        text: "Expresses proof of ownership of an address for any chain that uses public-private key cryptography in address ownership."
      },
      properties: [
        {
          label: "Chain",
          path: ["$.AddressOwner.chain"],
          schema: { type: "string" }
        },
        {
          label: "Address",
          path: ["$.AddressOwner.address"],
          schema: { type: "string" }
        },
        {
          label: "Proof",
          path: ["$.AddressOwner.proof"],
          schema: { type: "string" }
        }
      ]
    }
  },
  counterparty: {
    id: `counterparty-output-descriptor`,
    schema: [
      {
        uri: "https://demos.verite.id/schemas/identity/1.0.0/CounterpartyAccountHolder"
      }
    ],
    name: "Counterparty PII Compliance",
    description: `Attestation of Counterparty PII used for originators and beneficiaries of transactions that trigger counterparty exchange requirements`,
    display: {
      title: {
        text: `Counterparty Compliance`
      },
      subtitle: {
        path: ["$.CounterpartyAccountHolder.legalName"],
        fallback: "Includes legal name"
      },
      description: {
        text: "Describes an attestation of Counterparty PII used for originators and beneficiaries of transactions that trigger counterparty exchange requirements, such as the US Travel Rule and the FATF InterVASP message requirements."
      },
      properties: [
        {
          label: "Legal Name",
          path: ["$.CounterpartyAccountHolder.legalName"],
          schema: { type: "string" }
        },
        {
          label: "Account Number",
          path: ["$.CounterpartyAccountHolder.accountNumber"],
          schema: { type: "string" }
        }
      ]
    }
  }
}

export type GenerateManifest = (
  type: string,
  issuer: CredentialIssuer
) => CredentialManifest

/**
 *
 */
export const generateManifest: GenerateManifest = (type, issuer) => {
  const credentialType = findCredentialType(type)

  return {
    id: credentialType.type,
    version: "0.1.0",
    issuer: {
      id: issuer.did.key,
      name: issuer.name
    },
    format: {
      jwt_vc: {
        alg: ["EdDSA"]
      },
      jwt_vp: {
        alg: ["EdDSA"]
      }
    },
    output_descriptors: [OUTPUT_DESCRIPTORS[type]],
    presentation_definition: PRESENTATION_DEFINITION
  }
}
