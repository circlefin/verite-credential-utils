import { fullURL } from "lib/url-fns"

export const definition = {
  id: "CounterpartyAccountHolderPresentationDefinition",
  input_descriptors: [
    {
      id: "counterparty_input",
      name: "Counterparty PII Compliance",
      purpose: "Please provide a valid credential from a trusted issuer",
      schema: [
        {
          uri: fullURL("/api/schemas/CounterpartyAccountHolder"),
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
              "$.credentialSubject.CounterpartyAccountHolder.legalName",
              "$.vc.credentialSubject.CounterpartyAccountHolder.legalName",
              "$.CounterpartyAccountHolder.legalName"
            ],
            purpose: "The Attestation requires the field: 'legalName'.",
            predicate: "required",
            filter: {
              type: "string"
            }
          },
          {
            path: [
              "$.credentialSubject.CounterpartyAccountHolder.accountNumber",
              "$.vc.credentialSubject.CounterpartyAccountHolder.accountNumber",
              "$.CounterpartyAccountHolder.accountNumber"
            ],
            purpose: "The Attestation requires the field: 'accountNumber'.",
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
