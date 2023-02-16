import { ethers } from "ethers"
import React from "react"
import type { FC } from "react"

type Props = {
  value: string
  setValue: (value: string) => void
  generateCredential: () => void
}

declare global {
  interface Window {
    ethereum?: ethers.providers.ExternalProvider
  }
}

const VcInput: FC<Props> = ({ value, setValue, generateCredential }) => {
  return (
    <>
      <div className="flex mt-1 rounded-md shadow-sm">
        <div className="relative flex items-stretch flex-grow focus-within:z-10">
          <input
            type="text"
            name="vc"
            id="vc"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete="crypto"
            className="block w-full border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-l-md sm:text-sm"
            placeholder="enter VC jwt"
          />
        </div>
        <button
          type="button"
          className="relative inline-flex items-center px-4 py-2 -ml-px space-x-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          onClick={() => {
            generateCredential()
          }}
        >
          <span>Decode Credential</span>
        </button>
      </div>
    </>
  )
}

export default VcInput

