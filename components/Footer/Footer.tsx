import { Text, Stack, Link } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import { useCookies } from 'react-cookie'

export default function Footer() {
  const [, , removeCookies] = useCookies(['lifeInfo'])
  function resetLifeInfo() {
    removeCookies('lifeInfo')
  }

  return (
    <Stack as="footer" align="center" pb={4}>
      <Link as={NextLink} href="/">
        <a
          role="link"
          tabIndex={0}
          onClick={() => resetLifeInfo()}
          onKeyPress={() => resetLifeInfo()}
          style={{ textDecoration: 'underline' }}
        >
          Change your data
        </a>
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
