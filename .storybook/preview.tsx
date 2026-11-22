import type { Preview } from '@storybook/nextjs-vite'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../constants/theme/theme'

const preview: Preview = {
  decorators: [
    (Story) => (
      <ChakraProvider resetCSS theme={theme}>
        <Story />
      </ChakraProvider>
    ),
  ],
}

export default preview
