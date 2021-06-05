import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.min.css';
import { Provider } from 'next-auth/client'
import { ToastContainer } from 'react-toastify'
import NavBar from '../components/common/NavBar'
import Footer from '../components/common/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ToastContainer />
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  )
}

export default MyApp
