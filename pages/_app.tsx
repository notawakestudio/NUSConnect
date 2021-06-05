import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.min.css';
import { Provider } from 'next-auth/client'
import { ToastContainer } from 'react-toastify'

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ToastContainer />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
