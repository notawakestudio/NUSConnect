import Head from 'next/head'
import React from 'react'
import Auth from '../../components/common/Auth'
import Layout from '../../components/common/Layout'

export default function NewPost(): JSX.Element {
  return (
    <>
      <Head>
        <title>Forum</title>
        <meta name="description" content="Forum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Auth>
        <Layout>
          <div className="flex flex-row flex-nowrap mt-10">
            <div className="max-w-md min-w-md flex-shrink-0"> left </div>
            <div className="flex content-center justify-center self-center">right</div>
          </div>
        </Layout>
      </Auth>
    </>
  )
}

// export const getStaticProps: GetStaticProps = async () => {
//   const postList = getAllPosts()
//   return {
//     props: {
//       postList,
//     },
//   }
// }
