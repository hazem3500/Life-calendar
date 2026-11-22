import { Text, Stack, Link } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import { useCookies } from 'react-cookie'
import { useFeedback } from '@hazem3500/feedback'

export default function Footer() {
  const [, , removeCookies] = useCookies(['lifeInfo'])
  const feedback = useFeedback()
  function resetLifeInfo() {
    removeCookies('lifeInfo')
  }

  return (
    <Stack as="footer" align="center" pb={4}>
      <Link as={NextLink} href="/" onClick={() => resetLifeInfo()} textDecoration="underline">
        Change your data
      </Link>
      <Link as="button" onClick={() => feedback.open('settings')} textDecoration="underline">
        Send feedback
      </Link>
      <Text>
        Made by{' '}
        <Link color="blue.500" href="https://www.hazem.cool/" isExternal>
          Hazem Osama
        </Link>
        , Inspired by{' '}
        <Link color="orange.500" href="https://waitbutwhy.com/2014/05/life-weeks.html" isExternal>
          Wait But Why
        </Link>
      </Text>
    </Stack>
  )
}
