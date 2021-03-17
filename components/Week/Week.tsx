import React from 'react'

type WeekProps = {
  lived: boolean
}

function Week({ lived }: WeekProps) {
  return (
    <div
      style={{
        width: 'var(--chakra-sizes-5)',
        height: 'var(--chakra-sizes-5)',
        border: 'var(--chakra-borders-2px)',
        borderRadius: 'var(--chakra-radii-md)',
        backgroundColor: lived ? 'var(--chakra-colors-green-300)' : 'var(--chakra-colors-gray-100)',
      }}
    />
  )
}

export default Week
