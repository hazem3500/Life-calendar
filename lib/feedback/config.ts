import type { FeedbackConfig } from '@hazem3500/feedback'
import { ownerSigningSender, type OwnerDevice } from '@hazem3500/feedback/owner'

export const FEEDBACK_ENDPOINT = '/api/feedback'

/**
 * In-app feedback: shake on a phone, Alt+Shift+I on desktop, or "Send feedback" in the footer. Reports from an
 * approved owner device are signed so the relay can mark them as Hazem's (they then become Board cards).
 */
export function buildFeedbackConfig(device: OwnerDevice | null): FeedbackConfig {
  return {
    app: 'life-calendar',
    endpoint: FEEDBACK_ENDPOINT,
    // No accounts: the relay gates on Origin, so no cookies are sent.
    credentials: 'omit',
    send: device ? ownerSigningSender(FEEDBACK_ENDPOINT, device, 'omit') : undefined,
    getVersion: () => ({ versionName: process.env.NEXT_PUBLIC_APP_VERSION || 'dev' }),
    // Shake is on by default on phones (the SDK only listens on touch-first devices).
    shake: { defaultEnabled: true },
    getTheme: () => 'light',
  }
}
