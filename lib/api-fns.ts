import { NextApiHandler } from "next"

import { apiDebug } from "./debug"

export const handler = (endpoint: NextApiHandler): NextApiHandler => {
  return async (req, res) => {
    apiDebug(`${req.method}: ${req.url}`)
    try {
      await endpoint(req, res)
    } catch (e) {
      console.error("API Error", e)
      res.status(500).json({
        status: 500,
        errors: [{ message: (e as Error).message }]
      })
    }
  }
}
