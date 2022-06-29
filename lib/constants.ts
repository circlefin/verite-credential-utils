/**
 *
 */
export type BaseCredentialProperty<T = string> = {
  id: T
  name: string
  secondary?: string
}

/**
 *
 */
export type CredentialType = BaseCredentialProperty<
  "kycaml" | "kybaml" | "address" | "counterparty"
> & {
  type: string
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
}

export type ChainId = BaseCredentialProperty

/**
 *
 */
export const CREDENTIAL_TYPES: CredentialType[] = [
  {
    id: "kycaml",
    name: "KYC/AML Attestation",
    type: "KYCAMLAttestation"
  },
  {
    id: "kybaml",
    name: "KYBP/AML Attestation",
    type: "KYBPAMLAttestation"
  },
  {
    id: "address",
    name: "Address Ownership",
    type: "AddressOwner"
  },
  {
    id: "counterparty",
    name: "Counterparty Compliance",
    type: "CounterpartyAccountHolder"
  }
]

/**
 *
 */
export const CREDENTIAL_ISSUERS: CredentialIssuer[] = [
  {
    id: "trusted",
    name: "Centre",
    secondary: "Trusted",
    isTrusted: true,
    did: {
      key: "did:key:z6Mkemh9X2XPtmRU3CU4S52Z68fkVfM1odRoFhnkJnuEvSnk",
      secret:
        "8b5d070d9edf63683a4e493b52aeacdc45a3fcb64c2192a8a809a434a7b4e63904b8d673ced9ec999ab3b5a5f49ed0ced7350f84d3a826a4b6acbb3cec5b0439"
    }
  },
  {
    id: "untrusted",
    name: "Hax0rz",
    secondary: "Untrusted",
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
      key: "did:key:z6MkvxqbBU1THGfAT7A21mWmo2jZCZ7HMrCd65wgnQDnuQLJ",
      secret:
        "0x92ade54134006266515bc1d92ca5653a59c3aed708c489b695bf5b799ba34a3ff54ec36abb0e9f3a12f1131d3c39d25268253f6f3c975515abb28ecad083554b"
    }
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
    secondary: "Ethereum Mainnet (1)"
  },
  {
    id: "5",
    name: "Goerli",
    secondary: "Ethereum Testnet (5)"
  },
  {
    id: "1337",
    name: "Hardhat",
    secondary: "Local Network (1337)"
  }
]
