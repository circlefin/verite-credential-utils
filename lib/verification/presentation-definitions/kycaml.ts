import { fullURL } from "lib/url-fns"

export const definition = {
  id: "KYCAMLPresentationDefinition",
  input_descriptors: [
    {
      id: "kycaml_input",
      name: "Proof of KYC",
      purpose: "Please provide a valid credential from a KYC/AML issuer",
      schema: [
        {
          uri: fullURL("/api/schemas/KYCAMLAttestation"),
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
              "$.credentialSubject.KYCAMLAttestation.process",
              "$.vc.credentialSubject.KYCAMLAttestation.process",
              "$.KYCAMLAttestation.process"
            ],
            purpose: "The KYC/AML Attestation requires the field: 'process'.",
            predicate: "required",
            filter: {
              type: "string"
            }
          },
          {
            path: [
              "$.credentialSubject.KYCAMLAttestation.approvalDate",
              "$.vc.credentialSubject.KYCAMLAttestation.approvalDate",
              "$.KYCAMLAttestation.approvalDate"
            ],
            purpose:
              "The KYC/AML Attestation requires the field: 'approvalDate'.",
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
