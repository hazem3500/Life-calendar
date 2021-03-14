import { ChakraProvider } from '@chakra-ui/react';
import PlausibleProvider from 'next-plausible'


function MyApp({ Component, pageProps }) {
    return (
        <PlausibleProvider domain="hazem.cool" customDomain="analytics.hazem.cool/js/plausible.js?original=" selfHosted>
            <ChakraProvider>
                <Component {...pageProps} />
            </ChakraProvider>
        </PlausibleProvider>
    );
}
export default MyApp;