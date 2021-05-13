import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Footer from '../components/common/Footer'
import NavBar from '../components/common/NavBar'

export default function Home(): JSX.Element {
  return (
    <body>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div className="container mx-auto pt-2 text-center">
        <h1>Dashboard</h1>
        <Link href="/quiz">
          <h2 className="cursor-pointer bg-indigo-700 text-gray-200">Quiz</h2>
        </Link>
        <Footer />
      </div>
    </body>
  )
}
