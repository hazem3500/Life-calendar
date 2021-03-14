import { Box } from '@chakra-ui/layout'
import React from 'react'

type WeekProps = {
  lived: boolean
}

export default function Week({ lived }: WeekProps) {
  return <Box boxSize={6} border="2px" borderRadius="md" bg={lived ? 'green.400' : 'gray.100'} />
}
