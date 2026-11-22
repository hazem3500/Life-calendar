import { useMemo, type ReactNode } from 'react'
import { FeedbackProvider } from '@hazem3500/feedback'
import '@hazem3500/feedback/style.css'
import { buildFeedbackConfig } from '../../lib/feedback/config'
import { ownerDevice } from '../../lib/feedback/ownerDevice'

export default function AppFeedback({ children }: { children: ReactNode }) {
  const config = useMemo(() => buildFeedbackConfig(ownerDevice()), [])
  return <FeedbackProvider config={config}>{children}</FeedbackProvider>
}
