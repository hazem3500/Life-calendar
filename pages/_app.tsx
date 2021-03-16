import { ChakraProvider } from '@chakra-ui/react'
import PlausibleProvider from 'next-plausible'
import theme from '../constants/theme/theme'

function MyApp({ Component, pageProps }) {
  return (
    <PlausibleProvider
      domain="hazem.cool"
      customDomain="analytics.hazem.cool/js/plausible.js?original="
      selfHosted
    >
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </PlausibleProvider>
  )
}
export default MyApp
