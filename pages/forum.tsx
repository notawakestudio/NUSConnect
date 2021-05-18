import Head from 'next/head'
import React, { useState } from 'react'
import PostMainItem from '../components/forum/PostMainItem'
import PostList from '../components/forum/PostList'
import Layout from '../components/common/Layout'
import PostData from '../public/data/ForumData.json'

export default function Forum({ posts }): JSX.Element {
  const [currentPostId, setCurrentPostId] = useState(1)

  return (
    <>
      <Head>
        <title>Forum</title>
        <meta name="description" content="Forum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex flex-auto">
          <PostList postList={posts} />
          <div> There is nothing here </div>
        </div>
      </Layout>
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
