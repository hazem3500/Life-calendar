import { ownerKeys } from '../../../../lib/feedback/ownerKeys'

/** GET /api/feedback/owner?kid=…: is this owner-device key approved? Only says yes or no. */
export async function GET(request: Request) {
  const kid = new URL(request.url).searchParams.get('kid') ?? ''
  const keys = await ownerKeys(process.env.FEEDBACK_OWNER_KEYS)
  return Response.json({ approved: keys.has(kid) }, { headers: { 'cache-control': 'no-store' } })
}
