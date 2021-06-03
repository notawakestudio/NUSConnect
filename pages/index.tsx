import Head from 'next/head'
import Footer from '../components/common/Footer'
import NavBar from '../components/common/NavBar'
import Feature from '../components/landingPage/Feature'
import Hero from '../components/landingPage/Hero'
import Pricing from '../components/landingPage/Pricing'
import Team from '../components/landingPage/Team'

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>NUS Connect | NotAwakeStudio</title>
        <meta name="description" content="NUS Connect" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Hero />
      <div className="container mx-auto pt-2 text-center  ">
        <Feature />
        <Team />
        <Pricing />
      </div>
      <Footer />
    </>
  )
}
