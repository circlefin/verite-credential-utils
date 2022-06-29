import { fullURL } from "lib/url-fns"

export const definition = {
  id: "AddressPresentationDefinition",
  input_descriptors: [
    {
      id: "address_input",
      name: "Proof of Address Ownership",
      purpose: "Please provide a valid credential from a truested issuer",
      schema: [
        {
          uri: fullURL("/api/schemas/AddressOwner"),
          required: true
        }
      ],
      constraints: {
        statuses: {
          active: {
            directive: "required"
          }
        },
        is_holder: [
          {
            field_id: ["subjectId"],
            directive: "required"
          }
        ],
        fields: [
          {
            path: [
              "$.credentialSubject.AddressOwner.chain",
              "$.vc.credentialSubject.AddressOwner.chain",
              "$.AddressOwner.chain"
            ],
            purpose: "The Attestation requires the field: 'chain'.",
            predicate: "required",
            filter: {
              type: "string"
            }
          },
          {
            path: [
              "$.credentialSubject.AddressOwner.address",
              "$.vc.credentialSubject.AddressOwner.address",
              "$.AddressOwner.address"
            ],
            purpose: "The Attestation requires the field: 'address'.",
            predicate: "required",
            filter: {
              type: "string"
            }
          },
          {
            path: [
              "$.credentialSubject.AddressOwner.proof",
              "$.vc.credentialSubject.AddressOwner.proof",
              "$.AddressOwner.proof"
            ],
            purpose: "The Attestation requires the field: 'proof'.",
            predicate: "required",
            filter: {
              type: "string"
            }
          }
        ]
      }
    }
  ]
}
