import React from 'react'
import { Heading, Container } from '@chakra-ui/react'

function Header() {
  return (
    <Container as="header" maxW="6xl" position="relative">
      <Heading as="h1" textAlign="center" size="4xl">
        LIFE CALENDAR
      </Heading>
    </Container>
  )
}

export default Header
