import { ChakraProvider } from '@chakra-ui/react'
import PlausibleProvider from 'next-plausible'
import theme from '../constants/theme/theme'

function MyApp({ Component, pageProps }) {
  return (
    <PlausibleProvider
      domain="life-calendar.xyz"
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
