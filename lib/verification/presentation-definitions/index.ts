import { PresentationDefinition } from "verite"

import { definition as address } from "./address"
import { definition as counterparty } from "./counterparty"
import { definition as kybaml } from "./kybaml"
import { definition as kycaml } from "./kycaml"

import { CredentialType } from "lib/constants"

export const VERIFICATION_PRESENTATION_DEFINITIONS = {
  kycaml,
  kybaml,
  address,
  counterparty
} as Record<CredentialType["id"], PresentationDefinition>
