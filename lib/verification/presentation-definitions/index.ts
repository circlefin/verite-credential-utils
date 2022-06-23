import { PresentationDefinition } from "verite"

import address from "./address.json"
import counterparty from "./counterparty.json"
import kybaml from "./kybaml.json"
import kycaml from "./kycaml.json"

import { CredentialType } from "lib/credential-fns"

export const VERIFICATION_PRESENTATION_DEFINITIONS = {
  kycaml,
  kybaml,
  address,
  counterparty
} as Record<CredentialType["id"], PresentationDefinition>
