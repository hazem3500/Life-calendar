import { createOwnerDevice, type OwnerDevice } from '@hazem3500/feedback/owner'

let device: OwnerDevice | null = null

/** This browser's owner-device key store (IndexedDB), created on first use in the browser only. */
export function ownerDevice(): OwnerDevice | null {
  if (typeof window === 'undefined' || typeof indexedDB === 'undefined') return null
  device ??= createOwnerDevice()
  return device
}
