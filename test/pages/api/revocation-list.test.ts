import { BitBuffer } from "bit-buffers"
import { decodeVerifiableCredential } from "verite"

import { CREDENTIAL_ISSUERS } from "lib/credential-fns"
import handler from "pages/api/revocation-list"
import { testHandler } from "test/support/mocks"

test("/revocation-list returns an encoded revocation list from a given issuer", async () => {
  const res = await testHandler(handler, {
    method: "GET",
    query: { issuer: CREDENTIAL_ISSUERS[0].id }
  })

  const encoded = res._getData()
  const list = await decodeVerifiableCredential(encoded)

  const statusList = BitBuffer.fromBitstring(list.credentialSubject.encodedList)

  expect(statusList.toIndexArray()).toEqual([42])
  expect(list.issuer.id).toEqual(CREDENTIAL_ISSUERS[0].did.key)
  expect(res.statusCode).toBe(200)
})
