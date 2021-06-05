import Head from 'next/head'
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
      <Hero />
      <div className="container mx-auto pt-2 text-center  ">
        <Feature />
        <Team />
        <Pricing />
      </div>
    </>
  )
}
