/**
 * Origins allowed to post reports. `FEEDBACK_ALLOWED_ORIGINS` (comma-separated) wins; otherwise only the site's own
 * origin, read from the forwarding headers so it also works behind a proxy (Vercel, a dev preview).
 */
export function allowedOrigins(headers: Headers, env: string | undefined): string[] {
  const listed = (env ?? '')
    .split(',')
    .map((o) => o.trim().replace(/\/$/, ''))
    .filter(Boolean)
  if (listed.length) return listed
  const host = headers.get('x-forwarded-host') ?? headers.get('host')
  if (!host) return []
  const proto =
    headers.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https')
  return [`${proto.split(',')[0].trim()}://${host.split(',')[0].trim()}`]
}
