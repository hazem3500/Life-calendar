import { parseCookie } from 'cookie'
import type { IncomingMessage } from 'http'

export function parseCookies(req?: IncomingMessage) {
  return parseCookie(req ? req.headers.cookie || '' : document.cookie)
}

/** The saved `lifeInfo` cookie's birthday, or null when it is missing or not valid JSON. */
export function savedDob(cookies: Record<string, string | undefined>): string | null {
  if (!cookies.lifeInfo) return null
  try {
    const dob = JSON.parse(cookies.lifeInfo)?.dob
    return typeof dob === 'string' && dob ? dob : null
  } catch {
    return null
  }
}
