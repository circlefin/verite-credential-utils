import { CredentialType, CREDENTIAL_VERIFIERS } from "./credential-fns"
import { fullURL } from "./url-fns"
import { VERIFICATION_PRESENTATION_DEFINITIONS } from "./verification/presentation-definitions"

/**
 * Generate a Presentation Definition for a verification request
 */
export const generateVerificationOffer = (
  credentialType: CredentialType,
  trustedIssuers: string[]
) => {
  const presentationDefinition =
    VERIFICATION_PRESENTATION_DEFINITIONS[credentialType.id]
  const trustedIssuerConstraint = {
    path: ["$.issuer.id", "$.issuer", "$.vc.issuer", "$.iss"],
    purpose: "We can only verify credentials attested by a trusted authority.",
    filter: {
      type: "string",
      pattern: trustedIssuers.map((issuer) => `^${issuer}$`).join("|")
    }
  }

  /**
   * Ensure the issuer is listed as a trusted issuer here
   */
  if (trustedIssuers.length) {
    presentationDefinition.input_descriptors[0].constraints?.fields?.push(
      trustedIssuerConstraint
    )
  }

  return {
    id: credentialType.id,
    type: "VerificationRequest",
    from: CREDENTIAL_VERIFIERS[0].did.key,
    created_time: new Date().toISOString(),
    expires_time: new Date(Date.now() + 300_000 /* 5 minutes */).toISOString(),
    reply_url: fullURL(
      `/api/verifications/submit?type=${
        credentialType.id
      }&issuers=${trustedIssuers.join(",")}`
    ),
    body: {
      status_url: fullURL(`/api/verifications/${credentialType.id}/status`), // TODO: this doesnt exist
      challenge: "random-challenge",
      presentation_definition: presentationDefinition
    }
  }
}
