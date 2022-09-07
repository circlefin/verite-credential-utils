import { LabeledDisplayMappingBuilder, OutputDescriptor, STRING_SCHEMA } from "verite"

import { AttestationTypes } from "lib/constants"


export function getOutputDescriptors(issuerName: string, type: AttestationTypes): OutputDescriptor[] {

  const properties = [
    new LabeledDisplayMappingBuilder("Legal Name", STRING_SCHEMA).path([`$.${type.type}.legalName`]).build(),
    new LabeledDisplayMappingBuilder("Account Holder", STRING_SCHEMA).path([`$.${type.type}.accountHolder`]).build(),
  ]

  const outputs = [
    {
      id: `${type.type}`,
      schema: type.definition.schema,
      name: "Counterparty PII Compliance",
      description:
        "Attestation of Counterparty PII used for originators and beneficiaries of transactions that trigger counterparty exchange requirements",
      display: {
        title: { text: "Counterparty Compliance" },
        subtitle: {
          path: [`$.${type.type}.legalName`],
          fallback: "Includes legal name"
        },
        description: {
          text: "Describes an attestation of Counterparty PII used for originators and beneficiaries of transactions that trigger counterparty exchange requirements, such as the US Travel Rule and the FATF InterVASP message requirements."
        },
        properties: properties
      }
    }
  ]

  return outputs
}
