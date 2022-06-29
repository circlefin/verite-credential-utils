import { OutputDescriptor } from "verite"

import { descriptor as address } from "./address"
import { descriptor as counterparty } from "./counterparty"
import { descriptor as kybaml } from "./kybaml"
import { descriptor as kycaml } from "./kycaml"

import { CredentialType } from "lib/constants"

export const OUTPUT_DESCRIPTORS = {
  kycaml,
  kybaml,
  address,
  counterparty
} as Record<CredentialType["id"], OutputDescriptor>
