import { faker } from "@faker-js/faker"
import { ethers } from "ethers"
import {
  ADDRESS_OWNER_ATTESTATION,
  Attestation,
  COUNTERPARTY_ACCOUNT_HOLDER_ATTESTATION,
  KYBPAML_ATTESTATION,
  KYCAML_ATTESTATION,
  KYCAML_CREDENTIAL_TYPE_NAME
} from "verite"

import { AttestationKeys, AttestationTypes } from "./constants"
import { apiDebug } from "./debug"

type GenerateAttestationOptions = {
  approvalDate?: Date
  issuanceDate?: Date
  chain?: string
}

type GenerateAttestation = (
  type: AttestationTypes,
  opts?: GenerateAttestationOptions
) => Promise<Attestation>

/**
 *
 */
export const generateAttestation: GenerateAttestation = async (type, opts) => {
  const approvalDate = opts?.approvalDate || new Date()
  apiDebug(`generateAttestation for type=${type}`)

  if (type.definition.process) {
    return {
      type: type.type,
      process: type.definition.process,
      approvalDate: approvalDate.toISOString()
    }
  } else {
    if (type.id === AttestationKeys.address) {
      if (!opts?.chain) {
        throw new Error("Missing attribute: chain")
      }
      const wallet = ethers.Wallet.createRandom()
      const issuanceDate = opts?.issuanceDate ?? new Date()
      const proof = await wallet.signMessage(
        [opts.chain, wallet.address, issuanceDate.toISOString()].join("")
      )
      return {
        type: ADDRESS_OWNER_ATTESTATION,
        chain: opts.chain,
        address: wallet.address,
        proof
      }
    }

    if (type.id === AttestationKeys.counterparty) {
      return {
        type: COUNTERPARTY_ACCOUNT_HOLDER_ATTESTATION,
        legalName: faker.name.findName(),
        address: {
          type: "PostalAddress",
          addressLocality: faker.address.city(),
          addressRegion: faker.address.stateAbbr(),
          postalCode: faker.address.zipCode(),
          addressCountry: "United States"
        },
        accountNumber: faker.finance.ethereumAddress()
      }
    }
  }

  // Unknown Attestation type, throw.
  throw new Error(`Unknown attestation type: ${type}`)
}

export function getCredentialType(attestationType: string): string {
  if (attestationType === KYCAML_ATTESTATION) {
    return KYCAML_CREDENTIAL_TYPE_NAME
  } else if (attestationType === KYBPAML_ATTESTATION) {
    return "KYBPAMLCredential"
  } else if (attestationType === ADDRESS_OWNER_ATTESTATION) {
    return "AddressOwnerCredential"
  } else if (attestationType === COUNTERPARTY_ACCOUNT_HOLDER_ATTESTATION) {
    return "CounterpartyAccountHolderCredential"
  }
  throw new Error(`Unrecognized attestation type ${attestationType}`)
}
