import {
  CredentialType,
  CREDENTIAL_VERIFIERS,
  VerificationStatus
} from "lib/constants"
import { fullURL } from "lib/url-fns"
import { VERIFICATION_PRESENTATION_DEFINITIONS } from "lib/verification/presentation-definitions"

type GenerateVerificationOfferParams = {
  credentialType: CredentialType
  trustedIssuers: string[]
  statusEndpointResult: VerificationStatus
  subjectAddress?: string
  chainId?: string
}

/**
 * Generate a Presentation Definition for a verification request
 */
export const generateVerificationOffer = ({
  credentialType,
  trustedIssuers,
  statusEndpointResult,
  subjectAddress,
  chainId
}: GenerateVerificationOfferParams) => {
  // Deep clone the Presentation Definition
  const presentationDefinition = JSON.parse(
    JSON.stringify(VERIFICATION_PRESENTATION_DEFINITIONS[credentialType.id])
  )
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

  const params = new URLSearchParams({
    type: credentialType.id,
    status: statusEndpointResult.id
  })

  if (trustedIssuers.length) {
    params.append("issuers", trustedIssuers.join(","))
  }

  if (subjectAddress) {
    params.append("subjectAddress", subjectAddress)
  }

  if (chainId) {
    params.append("chainId", chainId)
  }

  return {
    id: credentialType.id,
    type: "VerificationRequest",
    from: CREDENTIAL_VERIFIERS[0].did.key,
    created_time: new Date().toISOString(),
    expires_time: new Date(Date.now() + 300_000 /* 5 minutes */).toISOString(),
    reply_url: fullURL(`/api/verifications/submit?${params.toString()}`),
    body: {
      status_url: fullURL(`/api/verifications/status?${params.toString()}`),
      challenge: "random-challenge",
      presentation_definition: presentationDefinition
    }
  }
}
