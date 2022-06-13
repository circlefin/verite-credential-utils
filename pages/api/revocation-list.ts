import { handler } from "lib/api-fns"
import { findCredentialIssuer } from "lib/credential-fns"
import { encodedRevocationList } from "lib/revocation-fns"

/**
 * Endpoint for fetching the current revocation list
 */
const endpoint = handler(async (req, res) => {
  const issuer = findCredentialIssuer(req.query.issuer as string)

  const list = await encodedRevocationList(issuer)

  res.status(200).send(list)
})

export default endpoint
