import { describe, expect, it } from 'vitest'
import { ownerKeyId } from '@hazem3500/feedback/server'
import { ownerKeys } from './ownerKeys'
import { allowedOrigins } from './origin'

const jwk = {
  kty: 'EC' as const,
  crv: 'P-256' as const,
  x: 'f83OJ3D2xF1Bg8vub9tLe1gHMzV76e8Tus9uPHvRVEU',
  y: 'x_FEzRu9m36HLN_tue659LNpXW6pCyStikYjKIWI5a0',
}

describe('owner keys', () => {
  it('maps each approved key by its key id', async () => {
    const keys = await ownerKeys(JSON.stringify([jwk]))
    expect(keys.get(await ownerKeyId(jwk))).toEqual(jwk)
  })

  it('ignores a missing, broken or non-key value', async () => {
    expect((await ownerKeys(undefined)).size).toBe(0)
    expect((await ownerKeys('not json')).size).toBe(0)
    expect((await ownerKeys('{"kty":"EC"}')).size).toBe(0)
    expect((await ownerKeys(JSON.stringify([{ kty: 'RSA' }]))).size).toBe(0)
  })
})

describe('allowed origins', () => {
  it('uses the env list when set', () => {
    expect(allowedOrigins(new Headers(), 'https://a.test/, https://b.test')).toEqual([
      'https://a.test',
      'https://b.test',
    ])
  })

  it('otherwise allows only the site itself, behind a proxy too', () => {
    const h = new Headers({
      host: 'internal:3000',
      'x-forwarded-host': 'life.test',
      'x-forwarded-proto': 'https',
    })
    expect(allowedOrigins(h, undefined)).toEqual(['https://life.test'])
    expect(allowedOrigins(new Headers({ host: 'localhost:3000' }), '')).toEqual([
      'http://localhost:3000',
    ])
  })
})
