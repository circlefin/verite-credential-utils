import {
  buildAndSignFulfillment,
  buildIssuer,
  decodeCredentialApplication,
  decodeVerifiablePresentation,
  getCredentialSchemaAsVCObject
} from "verite"

import { handler } from "lib/api-fns"
import { generateAttestation, getCredentialType } from "lib/attestation-fns"
import { AttestationKeys } from "lib/constants"
import {
  findAttestationType,
  findCredentialIssuer,
  findCredentialStatus,
  expirationDateForStatus,
  findChainId
} from "lib/credential-fns"
import { apiDebug } from "lib/debug"
import { generateManifest } from "lib/manifest-fns"
import { generateRevocationListStatus } from "lib/revocation-fns"

/**
 * Endpoint for initializing the Credential Exchange.
 *
 * This is the first step in the Credential Exchange process.  It accepts
 * a type, issuer, and status for building out a "manifest" and a credential
 * offer for the client mobile wallet to scan.
 */
const endpoint = handler(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const type = findAttestationType(req.query.type as string)
  const issuerInfo = findCredentialIssuer(req.query.issuer as string)
  const status = findCredentialStatus(req.query.status as string)
  const chainId =
    type.id === AttestationKeys.address
      ? findChainId(req.query.chain as string)
      : undefined

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

  apiDebug(`Issuer generating manifest for type.id=${type.id}`)
  const manifest = generateManifest(type, issuerInfo)

  /**
   * Using Presentation Exchange, the client will submit a credential
   * application. Since we are using JWTs to format the data, we first must
   * decode it.
   */
  const application = await decodeCredentialApplication(req.body)

  /**
   * Generate the attestation.
   */
  const attestation = await generateAttestation(type, {
    chain: chainId?.type
  })
  apiDebug(`Generated attestation type=${attestation.type}`)
  apiDebug("Generated attestation", JSON.stringify(attestation, null, 2))

  // Build a revocation list and index.
  const revocationListStatus = await generateRevocationListStatus(
    issuerInfo,
    status.id === "revoked"
  )

  const credentialType = getCredentialType(attestation.type)
  apiDebug(`Issuing credential of type=${credentialType}`)

  // Generate the Verifiable Presentation
  const presentation = await buildAndSignFulfillment(
    issuer,
    application.holder,
    manifest,
    attestation,
    credentialType,
    {
      credentialStatus: revocationListStatus,
      expirationDate: expirationDateForStatus(status),
      credentialSchema: getCredentialSchemaAsVCObject(type.definition)
    }
  )

  const decoded = await decodeVerifiablePresentation(presentation)
  apiDebug("Presentation", JSON.stringify(decoded, null, 2))

  // Response
  res.status(200).send(presentation)
})

export default endpoint
