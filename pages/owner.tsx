import { Box, Button, Code, Heading, Stack, Text } from '@chakra-ui/react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import type { OwnerDeviceKey } from '@hazem3500/feedback/owner'
import { ownerDevice } from '../lib/feedback/ownerDevice'

type State =
  { state: 'loading' } | { state: 'none' } | { state: 'pending' | 'approved'; key: OwnerDeviceKey }

async function readState(): Promise<State> {
  const key = await ownerDevice()?.current()
  if (!key) return { state: 'none' }
  const res = await fetch(`/api/feedback/owner?kid=${encodeURIComponent(key.kid)}`)
  const body = (await res.json().catch(() => null)) as { approved?: boolean } | null
  return { state: body?.approved ? 'approved' : 'pending', key }
}

/**
 * Owner device (not linked from the app). Life Calendar has no accounts, so Hazem's own reports are recognised by a
 * key pair made in this browser: the private key never leaves IndexedDB. Approving the device means adding the public
 * key shown here to FEEDBACK_OWNER_KEYS on the host; from then on this browser's reports are signed and become
 * Board cards.
 */
export default function OwnerPage() {
  const [s, setS] = useState<State>({ state: 'loading' })
  const refresh = () =>
    readState()
      .then(setS)
      .catch(() => setS({ state: 'none' }))

  useEffect(() => {
    refresh()
  }, [])

  async function setUp() {
    const device = ownerDevice()
    if (!device) return
    await device.create()
    await refresh()
  }

  async function forget() {
    await ownerDevice()?.forget()
    await refresh()
  }

  return (
    <>
      <Head>
        <title>Owner device · Life Calendar</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Box as="main" maxW="xl" mx="auto" px={6} py={16}>
        <Stack spacing={5}>
          <Heading as="h1" size="lg">
            Owner device
          </Heading>
          {s.state === 'loading' && <Text>Checking this browser…</Text>}
          {s.state === 'none' && (
            <>
              <Text>
                This browser isn&apos;t set up. Set it up to have your feedback reports marked as
                yours.
              </Text>
              <Button onClick={setUp} colorScheme="black" alignSelf="start">
                Set up this device
              </Button>
            </>
          )}
          {s.state === 'pending' && (
            <>
              <Text>
                Waiting for approval. Add this key to <Code>FEEDBACK_OWNER_KEYS</Code> on the host:
              </Text>
              <Code
                display="block"
                whiteSpace="pre-wrap"
                wordBreak="break-all"
                p={3}
                data-testid="owner-key"
              >
                {JSON.stringify(s.key.publicKeyJwk)}
              </Code>
            </>
          )}
          {s.state === 'approved' && (
            <Text>Approved. Reports from this browser are marked as yours.</Text>
          )}
          {(s.state === 'pending' || s.state === 'approved') && (
            <Button onClick={forget} variant="outline" alignSelf="start">
              Remove this device
            </Button>
          )}
        </Stack>
      </Box>
    </>
  )
}
