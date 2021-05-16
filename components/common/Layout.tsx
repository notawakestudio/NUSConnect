import Footer from './Footer'
import NavBar from './NavBar'

export default function Layout({ children }): JSX.Element {
  return (
    <>
      <NavBar />
      <div className="container mx-auto justify-content">{children}</div>
      <Footer />
    </>
  )
}
