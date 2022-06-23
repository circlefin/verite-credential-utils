import { OutputDescriptor } from "verite"

import address from "./address.json"
import counterparty from "./counterparty.json"
import kybaml from "./kybaml.json"
import kycaml from "./kycaml.json"

import { CredentialType } from "lib/credential-fns"

export const OUTPUT_DESCRIPTORS = {
  kycaml,
  kybaml,
  address,
  counterparty
} as Record<CredentialType["id"], OutputDescriptor>
