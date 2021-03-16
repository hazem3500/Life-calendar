import React from 'react'
import { Text, HStack, Box } from '@chakra-ui/react'

type LabelWithArrowProps = {
  /** @default 'end' */
  arrowDirection?: 'start' | 'end'
  children: React.ReactNode
}

const endArrowStyle = {
  right: '-10px',
  transform: 'rotate(90deg) translateX(4px)',
}

const startArrowStyle = {
  left: '-10px',
  transform: 'rotate(-90deg) translateX(-4px)',
}

function LabelWithArrow({ children, arrowDirection = 'end' }: LabelWithArrowProps) {
  return (
    <HStack align="center">
      {arrowDirection === 'start' && <Arrow arrowDirection="start" />}
      <Text fontSize="xl" fontWeight="bold">
        {children}
      </Text>
      {arrowDirection === 'end' && <Arrow arrowDirection="end" />}
    </HStack>
  )
}

function Arrow({ arrowDirection }: Pick<LabelWithArrowProps, 'arrowDirection'>) {
  return (
    <Box
      position="relative"
      height="2px"
      width="3xs"
      bg="currentColor"
      _after={{
        content: '""',
        position: 'absolute',
        bottom: 0,
        height: '10px',
        width: '10px',
        backgroundColor: 'currentColor',
        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        ...(arrowDirection === 'end' ? endArrowStyle : startArrowStyle),
      }}
    />
  )
}

export default LabelWithArrow
