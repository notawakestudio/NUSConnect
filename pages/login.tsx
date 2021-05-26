import Head from 'next/head'
import React from 'react'
import Layout from '../components/common/Layout'
import Login from '../components/common/Login'

export default function LoginPage(): JSX.Element {
  return (
    <div className="">
      <Head>
        <title>Login page</title>
        <meta name="login" content="login page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Login></Login>
      </Layout>
    </div>
  )
}
