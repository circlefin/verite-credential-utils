import type { NextApiHandler } from "next"

const endpoint: NextApiHandler = (req, res) => {
  res.status(200).json({ name: "John Doe" })
}

export default endpoint
