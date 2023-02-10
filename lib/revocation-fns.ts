import {
  buildIssuer,
  generateEncodedRevocationList,
  generateRevocationList,
  StatusList2021Entry,
  StatusList2021Credential
} from "verite"

import { CredentialIssuer } from "lib/constants"
import { fullURL } from "lib/url-fns"

const REVOKED_INDEX = 42
const STATUS_LIST = [REVOKED_INDEX]

/**
 * Build a revocation list, with the number 42 always being revoked.
 */
export const revocationList = async (
  issuer: CredentialIssuer
): Promise<StatusList2021Credential> => {
  const list = await generateRevocationList({
    statusList: STATUS_LIST,
    url: fullURL(`/api/revocation-list?issuer=${issuer.id}`),
    issuer: issuer.did.key,
    signer: buildIssuer(issuer.did.key, issuer.did.secret)
  })

  return list
}

export const encodedRevocationList = async (issuer: CredentialIssuer) => {
  const list = await generateEncodedRevocationList({
    statusList: STATUS_LIST,
    url: fullURL(`/api/revocation-list?issuer=${issuer.id}`),
    issuer: issuer.did.key,
    signer: buildIssuer(issuer.did.key, issuer.did.secret)
  })

  return list
}

/**
 * @returns a revocation list status containing a list and index
 */
export const generateRevocationListStatus = async (
  issuer: CredentialIssuer,
  isRevoked: boolean
): Promise<StatusList2021Entry> => {
  const index = isRevoked ? REVOKED_INDEX : 0

  return {
    id: fullURL(`/api/revocation-list?issuer=${issuer.id}#${index}`),
    type: "StatusList2021Entry",
    statusListIndex: index.toString(),
    statusListCredential: fullURL(`/api/revocation-list?issuer=${issuer.id}`),
    statusPurpose: "revocation"
  }
}
