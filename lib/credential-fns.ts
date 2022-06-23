const ONE_MINUTE = 60 * 1000
const TWO_MONTHS = 2 * 30 * 24 * 60 * 60 * 1000

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
  "active" | "expired" | "expiring-1min" | "revoked"
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
      key: "did:key:z6Mks2UJPUPNfyYnGLnScpyhQX9DGeRjRg1TUUZem5mFbhZR",
      secret:
        "059882c94b9b03a3626b1db67272e8e2494728536ba61787e3c74a3752fb6c5fbace444817250deef400bbcda39f3117b1c9b6f33bd0da079daac6444ecd4ca8"
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
    id: "expired",
    name: "Expired"
  },
  {
    id: "expiring-1min",
    name: "Expires in 1 minute"
  },
  {
    id: "revoked",
    name: "Revoked"
  }
]

/**
 *
 */
export const findCredentialType = (id: string): CredentialType => {
  const item = CREDENTIAL_TYPES.find((t) => t.id === id)
  if (!item) {
    throw new Error(`Unknown credential type: ${id}`)
  }
  return item
}

/**
 *
 */
export const findCredentialIssuer = (id: string): CredentialIssuer => {
  const item = CREDENTIAL_ISSUERS.find((t) => t.id === id)
  if (!item) {
    throw new Error(`Unknown credential issuer: ${id}`)
  }
  return item
}

/**
 *
 */
export const findCredentialStatus = (id: string): CredentialStatus => {
  const item = CREDENTIAL_STATUSES.find((t) => t.id === id)
  if (!item) {
    throw new Error(`Unknown credential status: ${id}`)
  }
  return item
}

/**
 *
 */
export const formatDidKey = (str: string) => {
  return `${str.slice(0, 26)}...${str.slice(-16)}`
}

/**
 *
 */
export const formatSecret = (str: string) => {
  return `${str.slice(0, 16)}...${str.slice(-16)}`
}

/**
 * Determine the expiration date to use for this credential.
 */
export const expirationDateForStatus = (
  status: CredentialStatus
): Date | undefined => {
  switch (status.id) {
    case "active":
      return new Date(Date.now() + TWO_MONTHS)
    case "expired":
      return new Date(Date.now() - TWO_MONTHS)
    case "expiring-1min":
      return new Date(Date.now() + ONE_MINUTE)
  }
}
