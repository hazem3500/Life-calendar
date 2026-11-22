import { ownerKeyId, publicJwk, type OwnerPublicKey } from '@hazem3500/feedback/server'

/**
 * Approved owner devices. Life Calendar has no accounts and no database, so the approved public keys live in the
 * `FEEDBACK_OWNER_KEYS` env var: a JSON array of the JWKs shown on /owner. Approving a device = adding its key there;
 * revoking = removing it. Anything that isn't a valid P-256 public key is ignored.
 */
export async function ownerKeys(raw: string | undefined): Promise<Map<string, OwnerPublicKey>> {
  const keys = new Map<string, OwnerPublicKey>()
  let list: unknown
  try {
    list = JSON.parse(raw || '[]')
  } catch {
    return keys
  }
  if (!Array.isArray(list)) return keys
  for (const item of list) {
    const jwk = publicJwk(item)
    if (jwk) keys.set(await ownerKeyId(jwk), jwk)
  }
  return keys
}
