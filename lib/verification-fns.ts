import { getPresentationDefinition } from "./verification/presentation-definitions"

import {
  AttestationTypes,
  CREDENTIAL_VERIFIERS,
  VerificationStatus
} from "lib/constants"
import { fullURL } from "lib/url-fns"

type GenerateVerificationOfferParams = {
  attestationType: AttestationTypes
  trustedIssuers: string[]
  statusEndpointResult: VerificationStatus
  subjectAddress?: string
  chainId?: string
}

/**
 * Generate a Presentation Definition for a verification request
 */
export const generateVerificationOffer = ({
  attestationType: attestationType,
  trustedIssuers,
  statusEndpointResult,
  subjectAddress,
  chainId
}: GenerateVerificationOfferParams) => {

  const pd = getPresentationDefinition(attestationType, trustedIssuers)

  const params = new URLSearchParams({
    type: attestationType.id,
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
    id: attestationType.id,
    type: "VerificationRequest",
    from: CREDENTIAL_VERIFIERS[0].did.key,
    created_time: new Date().toISOString(),
    expires_time: new Date(Date.now() + 300_000 /* 5 minutes */).toISOString(),
    reply_url: fullURL(`/api/verifications/submit?${params.toString()}`),
    body: {
      status_url: fullURL(`/api/verifications/status?${params.toString()}`),
      challenge: "random-challenge",
      presentation_definition: pd
    }
  }
}
