export type BaseCredentialProperty = {
  id: string
  name: string
  secondary?: string
}

export type CredentialType = BaseCredentialProperty
export type CredentialStatus = BaseCredentialProperty

export type CredentialIssuer = BaseCredentialProperty & {
  isTrusted: boolean
  did: {
    key: string
    secret: string
  }
}

export const CREDENTIAL_TYPES: CredentialType[] = [
  {
    id: "kycaml",
    name: "KYC/AML Attestation"
  },
  { id: "kyb", name: "KYB" }
]

export const CREDENTIAL_ISSUERS: CredentialIssuer[] = [
  {
    id: "centre",
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
    id: "haxorz",
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

export const CREDENTIAL_STATUSES: CredentialStatus[] = [
  {
    id: "approved",
    name: "Approved"
  },
  {
    id: "pending",
    name: "Pending"
  },
  {
    id: "denied",
    name: "Denied"
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

export const findCredentialType = (id: string): CredentialType => {
  const item = CREDENTIAL_TYPES.find((t) => t.id === id)
  if (!item) {
    throw new Error(`Unknown credential type: ${id}`)
  }
  return item
}

export const findCredentialIssuer = (id: string): CredentialIssuer => {
  const item = CREDENTIAL_ISSUERS.find((t) => t.id === id)
  if (!item) {
    throw new Error(`Unknown credential issuer: ${id}`)
  }
  return item
}

export const findCredentialStatus = (id: string): CredentialStatus => {
  const item = CREDENTIAL_STATUSES.find((t) => t.id === id)
  if (!item) {
    throw new Error(`Unknown credential status: ${id}`)
  }
  return item
}

export const formatDidKey = (str: string) => {
  return `${str.slice(0, 26)}...${str.slice(-16)}`
}

export const formatSecret = (str: string) => {
  return `${str.slice(0, 16)}...${str.slice(-16)}`
}
