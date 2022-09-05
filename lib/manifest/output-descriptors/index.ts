
import { OutputDescriptor } from "verite"

import { getOutputDescriptors as addressOutputs } from "./address"
import { getOutputDescriptors as counterpartyOutputs } from "./counterparty"
import { getOutputDescriptors as kybamlOutputs } from "./kybaml"
import { getOutputDescriptors as kycamlOutputs } from "./kycaml"

import { AttestationKeys, AttestationTypes } from "lib/constants"

export function getOutputDescriptors(issuerName: string, type: AttestationTypes) : OutputDescriptor[] {
  if (type.id === AttestationKeys.kycaml) {
    return kycamlOutputs(issuerName, type)
  } else if (type.id === AttestationKeys.kybpaml) {
    return kybamlOutputs(issuerName, type)
  } else if (type.id === AttestationKeys.address) {
    return addressOutputs(issuerName, type)
  } else if (type.id === AttestationKeys.counterparty) {
    return counterpartyOutputs(issuerName, type)
  }
  throw Error(`Unrecognized attestation type ${type}`)
}