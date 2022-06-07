export const CREDENTIAL_TYPES = ["KYC/AML Attestation", "KYB"]

export const ISSUERS = [
  {
    name: "Centre",
    isTrusted: true,
    did: {
      key: "did:key:z6MkmorDwcWwVU1BQgdw6jQkTErX92TCDYUw7wrDzGMSzUKQ",
      secret:
        "952fac0034f249fd42b9e5fb79cf100e54f17040078d501d697faedb12ebf9f56d4812049f9d8906f1aed5535026031a9fdd02f6836a7902fb7457bf2184d32f"
    }
  },
  {
    name: "Hax0rz",
    isTrusted: false,
    did: {
      key: "did:key:z6MkgDmGToSzwjJeSJ19ktfuW3sqSeauf99NrWwkbi7XixGP",
      secret:
        "84c758575fb16960695dd2bc4a931cc60e35ef4e9a3c7d99f347edc2b221e45a1a4248ab24284318a1c115aaba12381e7554de470ed0b2dd9ee8c1bf6e428880"
    }
  }
]

export const formatDidKey = (str: string) => {
  return `${str.slice(0, 26)}...${str.slice(-16)}`
}

export const formatSecret = (str: string) => {
  return `${str.slice(0, 16)}...${str.slice(-16)}`
}
