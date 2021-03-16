import { ChakraProvider } from "@chakra-ui/react"
import theme from '../constants/theme/theme'

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
}

export const decorators = [
		(Story) => (
			<ChakraProvider resetCSS theme={theme}>
				<Story />
			</ChakraProvider>
		),
	]