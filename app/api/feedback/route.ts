import { createFeedbackRelay, verifyOwnerSignature } from '@hazem3500/feedback/server'
import { ownerKeys } from '../../../lib/feedback/ownerKeys'
import { allowedOrigins } from '../../../lib/feedback/origin'

/**
 * POST /api/feedback: the in-app "Report an issue / request" relay (hazem3500/oz-feedback). It checks the Origin,
 * signs the exact body with the app's HMAC key and forwards it to Kody's `life-calendar` intake webhook, which files
 * the GitHub issue (and, for the owner, the Board card) as TheOzBot. No GitHub token lives here.
 * The owner is proven by an owner-device signature over the body (see /owner); a client's own owner flag is dropped.
 */
export async function POST(request: Request) {
  const {
    FEEDBACK_WEBHOOK_URL,
    FEEDBACK_HMAC_SECRET,
    FEEDBACK_OWNER_KEYS,
    FEEDBACK_ALLOWED_ORIGINS,
  } = process.env
  if (!FEEDBACK_WEBHOOK_URL || !FEEDBACK_HMAC_SECRET)
    return Response.json(
      { ok: false, error: { code: 'not_configured', message: 'Feedback is not set up yet' } },
      { status: 503 }
    )

  const body = await request.text()
  const keys = await ownerKeys(FEEDBACK_OWNER_KEYS)
  const owner = await verifyOwnerSignature({
    headers: request.headers,
    body,
    lookup: async (kid) => keys.get(kid) ?? null,
  })

  const relay = createFeedbackRelay({
    webhookUrl: FEEDBACK_WEBHOOK_URL,
    secret: FEEDBACK_HMAC_SECRET,
    allowedOrigins: allowedOrigins(request.headers, FEEDBACK_ALLOWED_ORIGINS),
  })
  const forwarded = new Request(request.url, { method: 'POST', headers: request.headers, body })
  return relay(forwarded, { owner: owner.ok ? 'device-key' : null })
}
