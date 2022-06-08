import { NextApiHandler } from "next"
import {
  buildAndSignFulfillment,
  buildIssuer,
  decodeCredentialApplication,
  KYCAMLAttestation
} from "verite"

import {
  findCredentialType,
  findCredentialIssuer,
  findCredentialStatus
} from "lib/credential-fns"

/**
 * Endpoint for initializing the Credential Exchange.
 *
 * This is the first step in the Credential Exchange process.  It accepts
 * a type, issuer, and status for building out a "manifest" and a credential
 * offer for the client mobile wallet to scan.
 */
const endpoint: NextApiHandler = async (req, res) => {
  const type = findCredentialType(req.query.type as string)
  const issuerInfo = findCredentialIssuer(req.query.issuer as string)
  const status = findCredentialStatus(req.query.status as string)

  /**
   * Get signer (issuer)
   *
   * When creating a Verifiable Credential, it is signed with the private key
   * of the issuer. In this demo we load from the environment variable. In a
   * production environment you would want to be sure to keep the secret
   * secure.
   */
  const issuer = buildIssuer(issuerInfo.did.key, issuerInfo.did.secret)

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

  // Response
  res.status(200).json(presentation)
}

export default endpoint
