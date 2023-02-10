import { BitBuffer } from "bit-buffers"
import { decodeVerifiableCredential } from "verite"

import { CREDENTIAL_ISSUERS } from "lib/constants"
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
  const status = await generateRevocationListStatus(issuer, false)

  expect(status).toEqual({
    id: `/api/revocation-list?issuer=trusted#0`,
    type: "StatusList2021Entry",
    statusListIndex: "0",
    statusListCredential: "/api/revocation-list?issuer=trusted",
    statusPurpose: "revocation"
  })
})

test("generateRevocationListStatus builds a revoked credential status (index 42)", async () => {
  const status = await generateRevocationListStatus(issuer, true)

  expect(status).toEqual({
    id: `/api/revocation-list?issuer=trusted#42`,
    type: "StatusList2021Entry",
    statusListIndex: "42",
    statusListCredential: "/api/revocation-list?issuer=trusted",
    statusPurpose: "revocation"
  })
})
