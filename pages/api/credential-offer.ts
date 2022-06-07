import { NextApiHandler } from "next"
import { buildCredentialOffer, buildKycAmlManifest } from "verite"

const endpoint: NextApiHandler = (req, res) => {
  const type = req.query.type as string
  const issuer = req.query.issuer as string
  const status = req.query.status as string

  const id = [type, issuer, status].join("-")

  const manifest = buildKycAmlManifest({
    id: process.env.ISSUER_DID_1 as string,
    name: "Verite"
  })

  // Wrap the manifest with additional metadata, such as the URL to post the
  // request to, so the mobile wallet knows how to request the credential.
  // In a production environment, the URL would need to be absolute, but for
  // sake of simplicity we will just use a path since the demo is entirely
  // within the browser.
  const wrapper = buildCredentialOffer(
    id,
    manifest,
    `${process.env.NEXT_PUBLIC_BASEURL}/api/credentials/${req.query.token}`
  )
}
