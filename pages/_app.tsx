import '../styles/globals.css'
import { Provider } from 'next-auth/client'
import { ChakraProvider } from '@chakra-ui/react'
import NavBar from '../components/common/NavBar'
import Footer from '../components/common/Footer'
import React from 'react'
import { StoreProvider } from '../components/utils/store'
import { useRouter } from 'next/router'
import ForumLayout from '../components/forum/ForumLayout'
import { UserProvider } from '../components/store/user'
import SidebarLayout from '../components/layouts/SidebarLayout'
function MyApp({ Component, pageProps }): JSX.Element {
  const router = useRouter()
  if (router.pathname.startsWith('/forum')) {
    return (
      <Provider session={pageProps.session}>
        <StoreProvider>
          <UserProvider>
            <ChakraProvider>
              <div className="h-screen">
                <NavBar />
                <div className="forum-page-layout">
                  <SidebarLayout>
                    <ForumLayout>
                      <Component {...pageProps} />
                    </ForumLayout>
                  </SidebarLayout>
                </div>
              </div>
            </ChakraProvider>
          </UserProvider>
        </StoreProvider>
      </Provider>
    )
  }

  return (
    <Provider session={pageProps.session}>
      <StoreProvider>
        <UserProvider>
          <ChakraProvider>
            <NavBar />
            <div className="min-h-screen">
              <SidebarLayout>
                <Component {...pageProps} />
              </SidebarLayout>
            </div>
            <Footer />
          </ChakraProvider>
        </UserProvider>
      </StoreProvider>
    </Provider>
  )
}

export default MyApp
