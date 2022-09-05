import { LabeledDisplayMappingBuilder, OutputDescriptor, STRING_SCHEMA } from "verite"

import { AttestationTypes } from "lib/constants"

export function getOutputDescriptors(issuerName: string, type: AttestationTypes): OutputDescriptor[] {

  const properties = [
    new LabeledDisplayMappingBuilder("Chain", STRING_SCHEMA).path([`$.${type.type}.chain`]).build(),
    new LabeledDisplayMappingBuilder("Address", STRING_SCHEMA).path([`$.${type.type}.address`]).build(),
    new LabeledDisplayMappingBuilder("Proof", STRING_SCHEMA).path([`$.${type.type}.proof`]).build(),
  ]
   const outputs = [
    {
      id: `${type.type}`,
      schema: type.definition.schema,
      name: "Proof of Address Ownership",
      description: "Attestation that the subject owns a given address",
      display: {
        title: {
          text: "Address Ownership"
        },
        subtitle: {
          path: [`$.${type.type}.address`],
          fallback: "Includes address"
        },
        description: {
          text: "Expresses proof of ownership of an address for any chain that uses public-private key cryptography in address ownership."
        },
        properties: properties
      }
    }
  ]
  return outputs

}