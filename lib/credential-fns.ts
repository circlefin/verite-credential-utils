import {
  CredentialType,
  CREDENTIAL_TYPES,
  CredentialIssuer,
  CREDENTIAL_ISSUERS,
  CredentialStatus,
  CREDENTIAL_STATUSES,
  VerificationStatus,
  VERIFICATION_STATUSES,
  ChainId,
  CHAIN_IDS
} from "./constants"

const ONE_MINUTE = 60 * 1000
const FIVE_MINUTES = 5 * ONE_MINUTE
const TWO_MONTHS = 2 * 30 * 24 * 60 * 60 * 1000

/**
 *
 */
export const findCredentialType = (id: string): CredentialType => {
  const item = CREDENTIAL_TYPES.find((t) => t.id === id)
  if (!item) {
    throw new Error(`Unknown credential type: ${id}`)
  }
  return item
}

/**
 *
 */
export const findCredentialIssuer = (id: string): CredentialIssuer => {
  const item = CREDENTIAL_ISSUERS.find((t) => t.id === id)
  if (!item) {
    throw new Error(`Unknown credential issuer: ${id}`)
  }
  return item
}

/**
 *
 */
export const findCredentialStatus = (id: string): CredentialStatus => {
  const item = CREDENTIAL_STATUSES.find((t) => t.id === id)
  if (!item) {
    throw new Error(`Unknown credential status: ${id}`)
  }
  return item
}

/**
 *
 */
export const findVerificationStatus = (id: string): VerificationStatus => {
  const item = VERIFICATION_STATUSES.find((t) => t.id === id)
  if (!item) {
    throw new Error(`Unknown verification status: ${id}`)
  }
  return item
}

/**
 *
 */
export const findChainId = (id: string): ChainId => {
  const item = CHAIN_IDS.find((t) => t.type === id)
  if (!item) {
    throw new Error(`Unknown chain ID: ${id}`)
  }
  return item
}

/**
 *
 */
export const formatDidKey = (str: string) => {
  return `${str.slice(0, 26)}...${str.slice(-16)}`
}

/**
 *
 */
export const formatSecret = (str: string) => {
  return `${str.slice(0, 16)}...${str.slice(-16)}`
}

/**
 * Determine the expiration date to use for this credential.
 */
export const expirationDateForStatus = (
  status: CredentialStatus
): Date | undefined => {
  switch (status.id) {
    case "active":
      return new Date(Date.now() + TWO_MONTHS)
    case "expired":
      return new Date(Date.now() - TWO_MONTHS)
    case "expiring-1min":
      return new Date(Date.now() + ONE_MINUTE)
    case "expiring-5min":
      return new Date(Date.now() + FIVE_MINUTES)
  }
}
