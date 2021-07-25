import Head from 'next/head'
import Feature from '../components/landingPage/Feature'
import Hero from '../components/landingPage/Hero'
import Pricing from '../components/landingPage/Pricing'
import Team from '../components/landingPage/Team'
import Timeline from '../components/landingPage/Timeline'

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>NUS Connect | NotAwakeStudio</title>
        <meta name="description" content="NUS Connect" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="dark:bg-black bg-white items-center w-full">
        <Hero />
        <div className="mx-auto">
          <Feature />
        </div>
        <Team />
        {/* <Pricing /> */}
        <Timeline />
      </div>
    </>
  )
}
