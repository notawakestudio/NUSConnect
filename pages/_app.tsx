import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.min.css'
import { Provider } from 'next-auth/client'
import { ToastContainer } from 'react-toastify'
import { ChakraProvider } from '@chakra-ui/react'
import NavBar from '../components/common/NavBar'
import Footer from '../components/common/Footer'
import React from 'react'
import { StoreProvider } from '../components/utils/store'

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <StoreProvider>
        <ChakraProvider>
          <ToastContainer />
          <NavBar />
          <Component {...pageProps} />
          <Footer />
        </ChakraProvider>
      </StoreProvider>
    </Provider>
  )
}

export default MyApp
