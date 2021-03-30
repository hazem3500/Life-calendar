import { ChakraProvider } from '@chakra-ui/react'
import PlausibleProvider from 'next-plausible'
import theme from '../constants/theme/theme'
import { CookiesProvider } from 'react-cookie'
import Router from 'next/router'

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

Router.events.on('routeChangeStart', (location) => {
  if (process.env.NODE_ENV === `production` && typeof window['plausible'] === `object`) {
    const pathIsExcluded =
      location &&
      typeof window['plausibleExcludePaths'] !== `undefined` &&
      window['plausibleExcludePaths'].some((rx) => rx.test(location.pathname))

    if (pathIsExcluded) return null

    window['plausible']('pageview')
  }
})

export default MyApp
