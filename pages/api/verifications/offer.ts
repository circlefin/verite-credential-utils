import { handler } from "lib/api-fns"
import { findAttestationType, findVerificationStatus } from "lib/credential-fns"
import { apiDebug } from "lib/debug"
import { generateVerificationOffer } from "lib/verification-fns"

/**
 * Endpoint for initializing a Verification process
 *
 */
const endpoint = handler((req, res) => {
  const requestedType = req.query.type as string
  apiDebug(`requested verification type=${requestedType}`)
  const attestationType = findAttestationType(requestedType)
  const subjectAddress = req.query.subjectAddress as string
  const chainId = req.query.chainId as string
  const statusEndpointResult = findVerificationStatus(
    req.query.status as string
  )
  const trustedIssuers = req.query.issuers
    ? (req.query.issuers as string).split(",")
    : []

  const offer = generateVerificationOffer({
    attestationType: attestationType,
    trustedIssuers,
    statusEndpointResult,
    subjectAddress,
    chainId
  })

  apiDebug(JSON.stringify(offer, null, 2))

  res.status(200).json(offer)
})

export default endpoint
