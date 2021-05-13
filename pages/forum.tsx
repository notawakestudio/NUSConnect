import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Footer from '../components/common/Footer'
import NavBar from '../components/common/NavBar'

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Forum</title>
        <meta name="description" content="Forum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      


      <Footer />
    </>
  )
}
