import { CredentialManifest, CredentialManifestBuilder, PresentationDefinition, proofOfControlPresentationDefinition } from "verite"

import { apiDebug } from "./debug"

import { CredentialIssuer, AttestationTypes } from "lib/constants"
import { getOutputDescriptors } from "lib/manifest/output-descriptors"


const PRESENTATION_DEFINITION: PresentationDefinition = proofOfControlPresentationDefinition()

export type GenerateManifest = (
  type: AttestationTypes,
  issuer: CredentialIssuer
) => CredentialManifest

/**
 *
 */
export const generateManifest: GenerateManifest = (type, issuer) => {
  apiDebug(`generateManifest => getAttestationInformation(${JSON.stringify(type)})`)
  const outputDescriptors = getOutputDescriptors(issuer.name, type)
  return new CredentialManifestBuilder(type.type).issuer( {
    id: issuer.did.key,
    name: issuer.name
  })
  .output_descriptors(outputDescriptors)
  .presentation_definition(PRESENTATION_DEFINITION)
  .build()
}
