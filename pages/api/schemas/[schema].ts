import { handler } from "lib/api-fns"
import { SCHEMAS } from "lib/schemas"

/**
 * Endpoint for fetching the current revocation list
 */
const endpoint = handler(async (req, res) => {
  const schema = req.query.schema as string

  if (!SCHEMAS[schema]) {
    res.status(404).send("")
  }

  res.status(200).send(SCHEMAS[schema])
})

export default endpoint
