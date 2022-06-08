import { FC, ReactNode, useEffect, useState } from "react"

type Props = {
  children?: ReactNode
}

const ClientSideOnly: FC<Props> = ({ children }) => {
  const [isClientSide, setIsClientSide] = useState(false)

  useEffect(() => {
    setIsClientSide(true)
  }, [])

  return <>{isClientSide ? children : <></>}</>
}

export default ClientSideOnly
