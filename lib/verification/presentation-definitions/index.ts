import {
  createBasicPresentationDefinitionForProcessAttestation,
  PresentationDefinition,
  PresentationDefinitionBuilder,
  stringValueConstraint,
  withDefaults
} from "verite"

import { AttestationKeys, AttestationTypes } from "lib/constants"


export function getPresentationDefinition(
  type: AttestationTypes,
  trustedAuthorities: string[] = []
): PresentationDefinition {

  const attestationInfo = type.definition
  const prefix = `${type.type}.`

  if (type.id === AttestationKeys.kybpaml) {
    return createBasicPresentationDefinitionForProcessAttestation(
      "KYBPAMLPresentationDefinition",
      type.definition,
      "KYBPAMLCredential",
      "Proof of KYBP",
      "Please provide a valid credential from a KYBP/AML issuer",
      trustedAuthorities
    )
  } else if (type.id === AttestationKeys.kycaml) {
    return createBasicPresentationDefinitionForProcessAttestation(
      "KYCAMLPresentationDefinition",
      type.definition,
      "KYCAMLCredential",
      "Proof of KYC",
      "Please provide a valid credential from a KYC/AML issuer",
      trustedAuthorities
    )
  } else if (type.id === AttestationKeys.counterparty) {
    return new PresentationDefinitionBuilder({id: "CounterpartyAccountHolderPresentationDefinition"})
    .addInputDescriptor("CounterpartyAccountHolderCredential", (c) => {
      c.name("Counterparty PII Compliance")
      .purpose("Please provide a valid credential from a trusted issuer")
      .withConstraints((b) => {
        b.addField(stringValueConstraint("legalName", prefix))
        .addField(stringValueConstraint("accountNumber", prefix))
      })
      .withConstraints(withDefaults(attestationInfo.schema, trustedAuthorities))
    }).build()

  } else if (type.id === AttestationKeys.address) {
    return new PresentationDefinitionBuilder({id: "AddressPresentationDefinition"})
    .addInputDescriptor("AddressOwnerCredential", (c) => {
      c.name("Proof of Address Ownership")
      .purpose("Please provide a valid credential from a truested issuer")
      .withConstraints((b) => {
        b.addField(stringValueConstraint("chain", prefix))
        .addField(stringValueConstraint("address", prefix))
        .addField(stringValueConstraint("proof", prefix))
      })
      .withConstraints(withDefaults(attestationInfo.schema, trustedAuthorities))
    }).build()
  }
  throw new Error(`Unrecognized presentation defniition id ${type.id}`)

}
