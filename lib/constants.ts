import {
  ADDRESS_OWNER_ATTESTATION,
  AttestationDefinition,
  COUNTERPARTY_ACCOUNT_HOLDER_ATTESTATION,
  getAttestionDefinition,
  KYBPAML_ATTESTATION,
  KYCAML_ATTESTATION
} from "verite"

/**
 *
 */
export type BaseCredentialProperty<T = string> = {
  id: T
  name: string
  secondary?: string
}

export enum AttestationKeys {
  kycaml = "kycaml",
  kybpaml = "kybpaml",
  address = "addresss",
  counterparty = "counterparty"
}

/**
 *
 */
export type AttestationTypes = BaseCredentialProperty<AttestationKeys> & {
  type: string
  definition: AttestationDefinition
}

/**
 *
 */
export type CredentialStatus = BaseCredentialProperty<
  "active" | "expired" | "expiring-1min" | "expiring-5min" | "revoked"
>

/**
 *
 */
export type VerificationStatus = BaseCredentialProperty<
  "approved" | "pending" | "rejected"
>

/**
 *
 */
export type CredentialIssuer = BaseCredentialProperty<
  "trusted" | "untrusted"
> & {
  isTrusted: boolean
  did: {
    key: string
    secret: string
  }
}

export type CredentialVerifier = BaseCredentialProperty & {
  did: {
    key: string
    secret: string
  }
  privateKey: string
}

export type ChainId = BaseCredentialProperty & {
  type: string
}

/**
 *
 */
export const ATTESTATION_TYPES: AttestationTypes[] = [
  {
    id: AttestationKeys.kycaml,
    name: "KYC/AML Attestation",
    type: KYCAML_ATTESTATION,
    definition: getAttestionDefinition(KYCAML_ATTESTATION)
  },
  {
    id: AttestationKeys.kybpaml,
    name: "KYBP/AML Attestation",
    type: KYBPAML_ATTESTATION,
    definition: getAttestionDefinition(KYBPAML_ATTESTATION)
  },
  {
    id: AttestationKeys.address,
    name: "Address Ownership",
    type: ADDRESS_OWNER_ATTESTATION,
    definition: getAttestionDefinition(ADDRESS_OWNER_ATTESTATION)
  },
  {
    id: AttestationKeys.counterparty,
    name: "Counterparty Compliance",
    type: COUNTERPARTY_ACCOUNT_HOLDER_ATTESTATION,
    definition: getAttestionDefinition(COUNTERPARTY_ACCOUNT_HOLDER_ATTESTATION)
  }
]

/**
 *
 */
export const CREDENTIAL_ISSUERS: CredentialIssuer[] = [
  {
    id: "trusted",
    name: "Centre",
    secondary: "Default: Trusted",
    isTrusted: true,
    did: {
      key: "did:key:z6Mkemh9X2XPtmRU3CU4S52Z68fkVfM1odRoFhnkJnuEvSnk",
      secret:
        "8b5d070d9edf63683a4e493b52aeacdc45a3fcb64c2192a8a809a434a7b4e63904b8d673ced9ec999ab3b5a5f49ed0ced7350f84d3a826a4b6acbb3cec5b0439"
    }
  },
  {
    id: "untrusted",
    name: "Dark Web Issuer",
    secondary: "Default: Untrusted",
    isTrusted: false,
    did: {
      key: "did:key:z6MknK7ajENGkMcuode8RZm8wiBTfzcrWgAyzYHxH63egiU3",
      secret:
        "94fb2014d2f061b6f5d3b6e669f09e519b1c6139b27ff4c7e93dbed875c8ea9c74c74795e8f952d728c76f3588fca0269279554c477efc1567343fb0e1c96dcc"
    }
  }
]

/**
 *
 */
export const CREDENTIAL_VERIFIERS: CredentialVerifier[] = [
  {
    id: "verifier",
    name: "Verifier",
    did: {
      key: "did:key:z6Mks2UJPUPNfyYnGLnScpyhQX9DGeRjRg1TUUZem5mFbhZR",
      secret:
        "059882c94b9b03a3626b1db67272e8e2494728536ba61787e3c74a3752fb6c5fbace444817250deef400bbcda39f3117b1c9b6f33bd0da079daac6444ecd4ca8"
    },
    privateKey:
      "0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db"
  }
]

/**
 *
 */
export const CREDENTIAL_STATUSES: CredentialStatus[] = [
  {
    id: "active",
    name: "Active"
  },
  {
    id: "expiring-1min",
    name: "Expiring in 1 minute"
  },
  {
    id: "expiring-5min",
    name: "Expiring in 5 minutes"
  },
  {
    id: "expired",
    name: "Expired"
  },
  {
    id: "revoked",
    name: "Revoked"
  }
]

export const VERIFICATION_STATUSES: VerificationStatus[] = [
  {
    id: "pending",
    name: "Pending"
  },
  {
    id: "approved",
    name: "Approved"
  },
  {
    id: "rejected",
    name: "Rejected"
  }
]

export const CHAIN_IDS: ChainId[] = [
  {
    id: "1",
    name: "Ethereum",
    secondary: "Ethereum Mainnet (1)",
    type: "ethereum"
  },
  {
    id: "5",
    name: "Goerli",
    secondary: "Ethereum Testnet (5)",
    type: "ethereum-goerli"
  },
  {
    id: "1337",
    name: "Hardhat",
    secondary: "Local Network (1337)",
    type: "hardhat"
  }
]
