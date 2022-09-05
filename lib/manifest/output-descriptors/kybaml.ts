import { DataDisplayBuilder, OutputDescriptor } from "verite"

import { AttestationTypes } from "lib/constants"

export function getOutputDescriptors(issuerName: string, type: AttestationTypes): OutputDescriptor[] {

  const display = new DataDisplayBuilder({
    title: {
      text: `${issuerName} KYBP/AML Attestation`
    },
    subtitle: {
      path: [`$.${type.type}.approvalDate`, `$.vc.${type.type}.approvalDate`],
      fallback: "Includes date of approval"
    },
    description: {
      text: "The KYBP authority processes Know Your Business Partner and Anti-Money Laundering analysis, potentially employing a number of internal and external vendor providers."
    },
  }).addStringProperty("Process", b => b.path([`$.${type.type}.process`]))
  .addDateTimeProperty("Approved At", b => b.path([`$.${type.type}.approvalDate`]))

  return  [
    {
      id: `${type.id}`,
      schema: type.definition.schema,
      name: `Proof of Know Your Business Partner and Anti-Money Laundering from ${issuerName}`,
      description:  `Attestation that ${issuerName} has completed KYBP/AML verification for this subject`,
      display: display.build()
    }
  ]
}
