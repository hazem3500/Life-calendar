import { Text, Stack, Link } from '@chakra-ui/layout'
import React from 'react'

function resetLifeInfo() {
  localStorage.removeItem('lifeInfo')
}

export default function Footer() {
  return (
    <Stack as="footer" align="center" pb={4}>
      <Link href="/" onClick={() => resetLifeInfo()}>
        <a>Change your data</a>
      </Link>
      <Text>
        Inspired by{' '}
        <Link
          color="orange.500"
          href="https://waitbutwhy.com/2014/05/life-weeks.html"
          target="_blank"
        >
          <a>Wait But Why</a>
        </Link>
      </Text>
    </Stack>
  )
}
