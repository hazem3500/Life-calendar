import {
  createFeedbackRelay,
  MAX_BODY_BYTES,
  verifyOwnerSignature,
} from '@hazem3500/feedback/server'
import { ownerKeys } from '../../../lib/feedback/ownerKeys'
import { allowedOrigins } from '../../../lib/feedback/origin'

let relay: ReturnType<typeof createFeedbackRelay> | undefined

const fail = (status: number, code: string, message: string) =>
  Response.json({ ok: false, error: { code, message } }, { status })

export async function POST(request: Request) {
  const {
    FEEDBACK_WEBHOOK_URL,
    FEEDBACK_HMAC_SECRET,
    FEEDBACK_OWNER_KEYS,
    FEEDBACK_ALLOWED_ORIGINS,
  } = process.env
  if (!FEEDBACK_WEBHOOK_URL || !FEEDBACK_HMAC_SECRET)
    return fail(503, 'not_configured', 'Feedback is not set up yet')

  const origins = allowedOrigins(request.headers, FEEDBACK_ALLOWED_ORIGINS)
  if (!origins.includes(request.headers.get('origin') ?? ''))
    return fail(403, 'origin', 'Origin not allowed')
  if (Number(request.headers.get('content-length') || 0) > MAX_BODY_BYTES)
    return fail(413, 'too_large', 'Request too large')

  const reader = request.body?.getReader()
  const chunks: Uint8Array[] = []
  let size = 0
  if (reader) {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > MAX_BODY_BYTES) {
        await reader.cancel()
        return fail(413, 'too_large', 'Request too large')
      }
      chunks.push(value)
    }
  }
  const bytes = new Uint8Array(size)
  let offset = 0
  for (const chunk of chunks) {
    bytes.set(chunk, offset)
    offset += chunk.byteLength
  }
  const body = new TextDecoder().decode(bytes)
  const keys = await ownerKeys(FEEDBACK_OWNER_KEYS)
  const owner = await verifyOwnerSignature({
    headers: request.headers,
    body,
    lookup: async (kid) => keys.get(kid) ?? null,
  })
  relay ??= createFeedbackRelay({ webhookUrl: FEEDBACK_WEBHOOK_URL, secret: FEEDBACK_HMAC_SECRET })
  const forwarded = new Request(request.url, { method: 'POST', headers: request.headers, body })
  return relay(forwarded, { owner: owner.ok ? 'device-key' : null })
}
