import type {AppProps} from 'next/app'
import {theme} from "@chakra-ui/react";
import {ChakraProvider} from "@chakra-ui/provider";
import {createStandaloneToast} from '@chakra-ui/toast'

function MyApp({Component, pageProps}: AppProps) {
    const {ToastContainer} = createStandaloneToast()

    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
            <ToastContainer/>
        </ChakraProvider>
    );
}

export default MyApp
