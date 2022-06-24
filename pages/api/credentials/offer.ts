import { buildCredentialOffer } from "verite"

import { handler } from "lib/api-fns"
import {
  findCredentialIssuer,
  findCredentialStatus,
  findCredentialType
} from "lib/credential-fns"
import { apiDebug } from "lib/debug"
import { generateManifest } from "lib/manifest-fns"
import { fullURL } from "lib/url-fns"

/**
 * Endpoint for initializing the Credential Exchange.
 *
 * This is the first step in the Credential Exchange process.  It accepts
 * a type, issuer, and status for building out a "manifest" and a credential
 * offer for the client mobile wallet to scan.
 */
const endpoint = handler((req, res) => {
  const type = findCredentialType(req.query.type as string)
  const issuer = findCredentialIssuer(req.query.issuer as string)
  const status = findCredentialStatus(req.query.status as string)

  const id = [type.id, issuer.id, status.id].join("-")
  const manifest = generateManifest(type.id, issuer)

  // Wrap the manifest with additional metadata, such as the URL to post the
  // request to, so the mobile wallet knows how to request the credential.
  // In a production environment, the URL would need to be absolute, but for
  // sake of simplicity we will just use a path since the demo is entirely
  // within the browser.
  const wrapper = buildCredentialOffer(
    id,
    manifest,
    fullURL(
      `/api/credentials/submit?type=${type.id}&issuer=${issuer.id}&status=${status.id}`
    )
  )

  apiDebug(JSON.stringify(wrapper, null, 2))

  res.status(200).json(wrapper)
})

export default endpoint