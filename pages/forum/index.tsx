import Head from 'next/head'
import ForumHome from '../../components/forum/ForumHome'

export default function Forum(): JSX.Element {
  return (
    <>
      <Head>
        <title>Forum | NUS Connect</title>
        <meta name="description" content="Forum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container items-center justify-center">
        <ForumHome postCount={777} />
      </div>
    </>
  )
}
