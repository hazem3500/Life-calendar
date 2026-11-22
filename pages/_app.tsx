import { ChakraProvider } from '@chakra-ui/react'
import PlausibleProvider from 'next-plausible'
import theme from '../constants/theme/theme'
import { CookiesProvider } from 'react-cookie'
import Router from 'next/router'
import type { AppProps } from 'next/app'
import AppFeedback from '../components/AppFeedback/AppFeedback'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider
      domain="life-calendar.xyz"
      customDomain="https://analytics.hazem.cool/"
      selfHosted
    >
      <CookiesProvider>
        <ChakraProvider resetCSS theme={theme}>
          <AppFeedback>
            <Component {...pageProps} />
          </AppFeedback>
        </ChakraProvider>
      </CookiesProvider>
    </PlausibleProvider>
  )
}

Router.events.on('routeChangeStart', (url: string) => {
  const location = new URL(url, window.location.origin)
  if (process.env.NODE_ENV === `production` && typeof window['plausible'] === `object`) {
    const pathIsExcluded =
      typeof window['plausibleExcludePaths'] !== `undefined` &&
      window['plausibleExcludePaths'].some((rx: RegExp) => rx.test(location.pathname))

    if (pathIsExcluded) return

    window['plausible']('pageview')
  }
})

export default MyApp
