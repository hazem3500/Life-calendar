import { ChakraProvider } from '@chakra-ui/react'
import PlausibleProvider from 'next-plausible'
import theme from '../constants/theme/theme'
import { CookiesProvider } from 'react-cookie'

function MyApp({ Component, pageProps }) {
  return (
    <PlausibleProvider
      domain="life-calendar.xyz"
      customDomain="https://analytics.hazem.cool/"
      selfHosted
    >
      <CookiesProvider>
        <ChakraProvider resetCSS theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </CookiesProvider>
    </PlausibleProvider>
  )
}
export default MyApp
