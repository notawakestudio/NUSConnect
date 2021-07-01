import Head from 'next/head'
import React from 'react'
import Layout from '../components/layouts/Layout'
import Login from '../components/common/Login'

export default function LoginPage(): JSX.Element {
  return (
    <div className="">
      <Head>
        <title>Login | NUS Connect</title>
        <meta name="login" content="login page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Login />
      </Layout>
    </div>
  )
}
