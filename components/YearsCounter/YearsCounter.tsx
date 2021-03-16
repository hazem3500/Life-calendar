import { Box, Stack, Text } from '@chakra-ui/layout'
import React from 'react'

type YearsCounterProps = {
  yearsLived: number
}

export default function YearsCounter({ yearsLived }: YearsCounterProps) {
  return (
    <Stack textAlign="center" spacing={1}>
      <Text fontWeight="bold" fontSize="xl" lineHeight="none">
        NOW
      </Text>
      <Text lineHeight="none">YOU'RE</Text>
      <Text fontWeight="bold" fontSize="5xl" lineHeight="0.6">
        {yearsLived}
      </Text>
    </Stack>
  )
}
