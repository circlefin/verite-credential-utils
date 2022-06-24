import {
  EncodedPresentationSubmission,
  validateVerificationSubmission,
  verificationResult
} from "verite"

import { handler } from "lib/api-fns"
import { CREDENTIAL_VERIFIERS, findCredentialType } from "lib/credential-fns"
import { generateVerificationOffer } from "lib/verification-fns"

/**
 * Endpoint for initializing a Verification process
 *
 */
const endpoint = handler(async (req, res) => {
  const type = findCredentialType(req.query.type as string)
  const issuers = req.query.issuers
    ? (req.query.issuers as string).split(",")
    : []
  const subjectAddress = req.query.address as string

  const submission: EncodedPresentationSubmission = req.body

  // find the verification offer
  const verificationOffer = generateVerificationOffer(type, issuers)

  if (!verificationOffer) {
    // unable to find a verification offer with these params
    res.status(404).send("")
    return
  }

  // verify offer
  try {
    await validateVerificationSubmission(
      submission,
      verificationOffer.body.presentation_definition,
      {
        challenge: verificationOffer.body.challenge
      }
    )
  } catch (e) {
    // unable to find a verification offer with these params
    res.status(400).json({
      status: "invalid",
      errors: [
        {
          message: (e as Error).message
        }
      ]
    })
    return
  }

  if (subjectAddress) {
    const result = await verificationResult(
      /* subjectAddress: */ subjectAddress,
      /* contractAddress: */ "0xEAE412f2dd33774C8Dec15C0dae465a45d17EFa8",
      /* signer:*/ CREDENTIAL_VERIFIERS[0].did.secret,
      /* chainId:*/ 5
    )

    res.json({ status: "approved", result })
  } else {
    res.json({ status: "approved" })
  }
})

export default endpoint
