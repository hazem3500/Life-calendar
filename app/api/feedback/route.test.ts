import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const origin = 'https://life-calendar.zem.cool'
let post: typeof import('./route').POST
let upstream: ReturnType<typeof vi.fn>

beforeEach(async () => {
  vi.resetModules()
  vi.stubEnv('FEEDBACK_WEBHOOK_URL', 'https://intake.test/feedback')
  vi.stubEnv('FEEDBACK_HMAC_SECRET', 'test-secret')
  vi.stubEnv('FEEDBACK_ALLOWED_ORIGINS', origin)
  upstream = vi.fn(async () => Response.json({ ok: true }))
  vi.stubGlobal('fetch', upstream)
  post = (await import('./route')).POST
})
afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
})

describe('public feedback relay', () => {
  it('rejects a foreign origin without forwarding it', async () => {
    const response = await post(
      new Request(origin + '/api/feedback', {
        method: 'POST',
        headers: { origin: 'https://foreign.test' },
        body: '{}',
      })
    )
    expect(response.status).toBe(403)
    expect(upstream).not.toHaveBeenCalled()
  })

  it('rejects a declared oversized body', async () => {
    const response = await post(
      new Request(origin + '/api/feedback', {
        method: 'POST',
        headers: { origin, 'content-length': '1000001' },
        body: '{}',
      })
    )
    expect(response.status).toBe(413)
    expect(upstream).not.toHaveBeenCalled()
  })

  it('cancels a chunked body as soon as it crosses the cap', async () => {
    const cancel = vi.fn()
    const body = new ReadableStream({
      pull(controller) {
        controller.enqueue(new Uint8Array(600000))
      },
      cancel,
    })
    const request = new Request(origin + '/api/feedback', {
      method: 'POST',
      headers: { origin },
      body,
      duplex: 'half',
    } as RequestInit)
    expect((await post(request)).status).toBe(413)
    expect(cancel).toHaveBeenCalledOnce()
    expect(upstream).not.toHaveBeenCalled()
  })

  it('keeps the burst limit between separate requests', async () => {
    const statuses = []
    for (let i = 0; i < 61; i++) {
      const request = new Request(origin + '/api/feedback', {
        method: 'POST',
        headers: { origin },
        body: JSON.stringify({ v: 1, op: 'ping' }),
      })
      statuses.push((await post(request)).status)
    }
    expect(statuses.slice(0, 60)).toEqual(Array(60).fill(200))
    expect(statuses[60]).toBe(429)
    expect(upstream).toHaveBeenCalledTimes(60)
  })
})
