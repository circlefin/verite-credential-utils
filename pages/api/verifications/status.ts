import { handler } from "lib/api-fns"
import { findVerificationStatus } from "lib/credential-fns"

/**
 * Endpoint for initializing a Verification process
 *
 */
const endpoint = handler(async (req, res) => {
  const statusEndpointResult = findVerificationStatus(
    req.query.status as string
  )

  res.json({ status: statusEndpointResult.id })
})

export default endpoint
