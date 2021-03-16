import React from 'react'
import { Heading, useColorMode, Container, IconButton } from '@chakra-ui/react'
import { IoMdSunny, IoMdMoon } from 'react-icons/io'

function Header() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Container as="header" maxW="6xl" position="relative">
      <Heading as="h1" textAlign="center" size="4xl">
        LIFE CALENDAR
      </Heading>
      <IconButton
        aria-label="toggle color mode"
        icon={colorMode === 'light' ? <IoMdSunny /> : <IoMdMoon />}
        position="absolute"
        right="0"
        top="50%"
        transform="translateY(-50%)"
        onClick={() => toggleColorMode()}
      />
    </Container>
  )
}

export default Header
