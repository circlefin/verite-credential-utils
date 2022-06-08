import {
  buildAndSignFulfillment,
  buildIssuer,
  decodeCredentialApplication,
  decodeVerifiablePresentation,
  KYCAMLAttestation
} from "verite"

import { handler } from "lib/api-fns"
import {
  findCredentialType,
  findCredentialIssuer,
  findCredentialStatus
} from "lib/credential-fns"
import { apiDebug } from "lib/debug"

/**
 * Endpoint for initializing the Credential Exchange.
 *
 * This is the first step in the Credential Exchange process.  It accepts
 * a type, issuer, and status for building out a "manifest" and a credential
 * offer for the client mobile wallet to scan.
 */
const endpoint = handler(async (req, res) => {
  const type = findCredentialType(req.query.type as string)
  const issuerInfo = findCredentialIssuer(req.query.issuer as string)
  const status = findCredentialStatus(req.query.status as string)

  /**
   * Get signer (issuer)
   *
   * When creating a Verifiable Credential, it is signed with the private key
   * of the issuer.
   */
  const issuer = buildIssuer(
    issuerInfo.did.key,
    Buffer.from(issuerInfo.did.secret, "hex")
  )

  /**
   * Using Presentation Exchange, the client will submit a credential
   * application. Since we are using JWTs to format the data, we first must
   * decode it.
   */
  const application = await decodeCredentialApplication(req.body)

  /**
   * Generate the attestation.
   */

  const attestation: KYCAMLAttestation =
    type.id === "kycaml"
      ? {
          type: "KYCAMLAttestation",
          process:
            "https://demos.verite.id/schemas/definitions/1.0.0/kycaml/usa",
          approvalDate: new Date().toISOString()
        }
      : {
          type: "KYCAMLAttestation", // TODO: change to KYB
          process: "https://demos.verite.id/schemas/definitions/1.0.0/kyb/usa",
          approvalDate: new Date().toISOString()
        }

  // Generate the Verifiable Presentation
  const presentation = await buildAndSignFulfillment(
    issuer,
    application,
    attestation // TODO: Update this method signature to allow for KYB, etc
  )

  const decoded = await decodeVerifiablePresentation(presentation)
  apiDebug("Presentation", JSON.stringify(decoded, null, 2))

  // Response
  res.status(200).send(presentation)
})

export default endpoint
