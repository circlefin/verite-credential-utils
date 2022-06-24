import type { CredentialManifest, PresentationDefinition } from "verite"

import { CredentialIssuer, CredentialType } from "lib/constants"
import { findCredentialType } from "lib/credential-fns"
import { OUTPUT_DESCRIPTORS } from "lib/manifest/output-descriptors"

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

export type GenerateManifest = (
  type: CredentialType["id"],
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
