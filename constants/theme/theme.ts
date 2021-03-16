import { extendTheme } from '@chakra-ui/react'
import * as components from './components'

const theme = extendTheme({
  components: {
    ...components,
  },
})

export default theme
