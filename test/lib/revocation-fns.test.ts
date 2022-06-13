import { BitBuffer } from "bit-buffers"
import { decodeVerifiableCredential, RevocationList2021Status } from "verite"

import { CREDENTIAL_ISSUERS } from "lib/credential-fns"
import {
  encodedRevocationList,
  generateRevocationListStatus,
  revocationList
} from "lib/revocation-fns"

const issuer = CREDENTIAL_ISSUERS[0]

test("revocationList generates a revocation list with a single revoked index", async () => {
  const list = await revocationList(issuer)

  const statusList = BitBuffer.fromBitstring(list.credentialSubject.encodedList)

  expect(statusList.toIndexArray()).toEqual([42])
})

test("encodedRevocationList returns a JWT encoded revocation list", async () => {
  const encoded = await encodedRevocationList(issuer)
  const list = await decodeVerifiableCredential(encoded)

  const statusList = BitBuffer.fromBitstring(list.credentialSubject.encodedList)

  expect(statusList.toIndexArray()).toEqual([42])
})

test("generateRevocationListStatus builds a non-revoked credential status", async () => {
  const status = await generateRevocationListStatus(false)

  expect(status).toEqual({
    id: `list#0`,
    type: "RevocationList2021Status",
    statusListIndex: "0",
    statusListCredential: "list"
  })
})

test("generateRevocationListStatus builds a revoked credential status (index 42)", async () => {
  const status = await generateRevocationListStatus(true)

  expect(status).toEqual({
    id: `list#42`,
    type: "RevocationList2021Status",
    statusListIndex: "42",
    statusListCredential: "list"
  })
})
