import { fullURL } from "lib/url-fns"

export const descriptor = {
  id: "address-output-descriptor",
  schema: [
    {
      uri: fullURL("/api/schemas/AddressOwner")
    }
  ],
  name: "Proof of Address Ownership",
  description: "Attestation that the subject owns a given address",
  display: {
    title: {
      text: "Address Ownership"
    },
    subtitle: {
      path: ["$.AddressOwner.address"],
      fallback: "Includes address"
    },
    description: {
      text: "Expresses proof of ownership of an address for any chain that uses public-private key cryptography in address ownership."
    },
    properties: [
      {
        label: "Chain",
        path: ["$.AddressOwner.chain"],
        schema: { type: "string" }
      },
      {
        label: "Address",
        path: ["$.AddressOwner.address"],
        schema: { type: "string" }
      },
      {
        label: "Proof",
        path: ["$.AddressOwner.proof"],
        schema: { type: "string" }
      }
    ]
  }
}
