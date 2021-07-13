import Head from 'next/head'
import Badges from '../../components/profile/Badges'

export default function Badge(): JSX.Element {
  return (
      <Head>
        <title>Badges | NUS Connect</title>
        <meta name="description" content="NUS Connect" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-full">
        <Badges />
      </div>
  )
}
