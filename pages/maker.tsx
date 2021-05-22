import MDEditor from '../components/common/MDEditor'
import Layout from '../components/common/Layout'
import Head from 'next/head'
export default function Maker(): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>Maker | NUS Connect</title>
        <meta name="description" content="NUS Connect" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-center text-xl py-4">Make a Question</h1>
      <MDEditor />
    </Layout>
  )
}
