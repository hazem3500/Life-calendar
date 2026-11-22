import { describe, expect, it } from 'vitest'
import type { IncomingMessage } from 'http'
import { parseCookies, savedDob } from './cookies'

const req = (cookie?: string) => ({ headers: { cookie } }) as unknown as IncomingMessage

describe('cookies', () => {
  it('reads the saved birthday from the lifeInfo cookie', () => {
    const value = encodeURIComponent(JSON.stringify({ dob: '1995-03-17' }))
    expect(savedDob(parseCookies(req(`lifeInfo=${value}`)))).toBe('1995-03-17')
  })

  it('returns null without a cookie or with a broken one', () => {
    expect(savedDob(parseCookies(req()))).toBeNull()
    expect(savedDob(parseCookies(req('lifeInfo=not-json')))).toBeNull()
    expect(savedDob(parseCookies(req('lifeInfo=%7B%7D')))).toBeNull()
  })
})
