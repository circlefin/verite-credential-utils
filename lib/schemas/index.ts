import * as AddressOwner from "./AddressOwner.json"
import * as CounterpartyAccountHolder from "./CounterpartyAccountHolder.json"
import * as KYBPAMLAttestation from "./KYBPAMLAttestation.json"
import * as KYCAMLAttestation from "./KYCAMLAttestation.json"
import * as ProofOfControl from "./ProofOfControl.json"

export const SCHEMAS = {
  AddressOwner,
  CounterpartyAccountHolder,
  KYBPAMLAttestation,
  KYCAMLAttestation,
  ProofOfControl
} as Record<string, unknown>
