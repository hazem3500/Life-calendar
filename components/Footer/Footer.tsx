import { Text, Stack, Link } from '@chakra-ui/layout'
import React from 'react'
import NextLink from 'next/link'

function resetLifeInfo() {
  localStorage.removeItem('lifeInfo')
}

export default function Footer() {
  return (
    <Stack as="footer" align="center" pb={4}>
      <Link as={NextLink} href="/" onClick={() => resetLifeInfo()}>
        <a style={{ textDecoration: 'underline' }}>Change your data</a>
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
