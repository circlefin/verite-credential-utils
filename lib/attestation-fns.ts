import { faker } from "@faker-js/faker"
import { ethers } from "ethers"
import type { Attestation } from "verite"

type GenerateAttestationOptions = {
  approvalDate?: Date
  issuanceDate?: Date
  chain?: string
}

type GenerateAttestation = (
  type: string,
  opts?: GenerateAttestationOptions
) => Promise<Attestation>

/**
 *
 */
export const generateAttestation: GenerateAttestation = async (type, opts) => {
  if (type === "kycaml") {
    const approvalDate = opts?.approvalDate || new Date()

    return {
      type: "KYCAMLAttestation",
      process: "https://verite.id/definitions/processes/kycaml/0.0.1/usa",
      approvalDate: approvalDate.toISOString()
    }
  }

  if (type === "kybaml") {
    const approvalDate = opts?.approvalDate || new Date()

    return {
      type: "KYBPAMLAttestation",
      process:
        "https://verite.id/definitions/processes/kycaml/0.0.1/generic--usa-legal_person",
      approvalDate: approvalDate.toISOString()
    }
  }

  if (type === "address") {
    const wallet = ethers.Wallet.createRandom()
    const chain = opts?.chain ?? "ethereum-ropsten"
    const issuanceDate = opts?.issuanceDate ?? new Date()
    const proof = await wallet.signMessage(
      [chain, wallet.address, issuanceDate.toISOString()].join("")
    )

    return {
      type: "AddressOwner",
      chain,
      address: wallet.address,
      proof
    }
  }

  if (type === "counterparty") {
    return {
      type: "CounterpartyAccountHolder",
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

  // Unknown Attestation type, throw.
  throw new Error(`Unknown attestation type: ${type}`)
}
