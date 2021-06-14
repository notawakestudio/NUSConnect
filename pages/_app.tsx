import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.min.css'
import { Provider } from 'next-auth/client'
import { ToastContainer } from 'react-toastify'
import { ChakraProvider } from '@chakra-ui/react'
import NavBar from '../components/common/NavBar'
import Footer from '../components/common/Footer'
import React from 'react'
import { StoreProvider } from '../components/utils/store'
import { useRouter } from 'next/router'
import ForumLayout from '../components/forum/ForumLayout'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  if (router.pathname.startsWith('/forum')) {
    return (
      <Provider session={pageProps.session}>
        <StoreProvider>
          <ChakraProvider>
            <ToastContainer />
            <NavBar />
            <ForumLayout>
              <Component {...pageProps} />
            </ForumLayout>
            <Footer />
          </ChakraProvider>
        </StoreProvider>
      </Provider>
    )
  }

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
