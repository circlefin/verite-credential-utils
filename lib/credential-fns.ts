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
      key: "did:key:z6MkmorDwcWwVU1BQgdw6jQkTErX92TCDYUw7wrDzGMSzUKQ",
      secret:
        "952fac0034f249fd42b9e5fb79cf100e54f17040078d501d697faedb12ebf9f56d4812049f9d8906f1aed5535026031a9fdd02f6836a7902fb7457bf2184d32f"
    }
  },
  {
    id: "haxorz",
    name: "Hax0rz",
    secondary: "Untrusted",
    isTrusted: false,
    did: {
      key: "did:key:z6MkgDmGToSzwjJeSJ19ktfuW3sqSeauf99NrWwkbi7XixGP",
      secret:
        "84c758575fb16960695dd2bc4a931cc60e35ef4e9a3c7d99f347edc2b221e45a1a4248ab24284318a1c115aaba12381e7554de470ed0b2dd9ee8c1bf6e428880"
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
