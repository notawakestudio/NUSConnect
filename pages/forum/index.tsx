import Head from 'next/head'
import React from 'react'
import Layout from '../../components/common/Layout'
import PostList from '../../components/forum/PostList'
import PostData from '../../public/data/ForumData.json'
import Auth from '../../components/common/Auth'

export default function Forum({ posts }): JSX.Element {
  return (
    <>
      <Head>
        <title>Forum</title>
        <meta name="description" content="Forum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Auth>
        <Layout>
          <div className="flex">
            <PostList postList={posts} />
            <div> There is nothing here </div>
          </div>
        </Layout>
      </Auth>
    </>
  )
}

export const getStaticProps = async () => {
  const posts = PostData
  return {
    props: {
      posts,
    },
  }
}
