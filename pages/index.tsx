import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Footer from '../components/common/Footer'
import NavBar from '../components/common/NavBar'
import Feature from '../components/landingPage/Feature'
import Hero from '../components/landingPage/Hero'
import Pricing from '../components/landingPage/Pricing'
import Team from '../components/landingPage/Team'
import { signIn, signOut, useSession } from 'next-auth/client'

export default function Home(): JSX.Element {
  const [session, loading] = useSession()

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
