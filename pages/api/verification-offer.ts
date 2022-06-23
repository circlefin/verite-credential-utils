import { buildCredentialOffer } from "verite"

import { handler } from "lib/api-fns"
import { findCredentialType } from "lib/credential-fns"
import { apiDebug } from "lib/debug"
import { generateVerificationOffer } from "lib/verification-fns"

/**
 * Endpoint for initializing a Verification process
 *
 */
const endpoint = handler((req, res) => {
  const type = findCredentialType(req.query.type as string)
  const issuers = req.query.issuers
    ? (req.query.issuers as string).split(",")
    : []

  const offer = generateVerificationOffer(type, issuers)

  apiDebug(JSON.stringify(offer, null, 2))

  res.status(200).json(offer)
})

export default endpoint
