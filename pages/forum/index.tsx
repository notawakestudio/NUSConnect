import Head from 'next/head'
import React from 'react'
import Auth from '../../components/common/Auth'
import Layout from '../../components/common/Layout'
import { getAllPosts } from '../../components/forum/ForumAPI'
import PostList from '../../components/forum/PostList'

export default function Forum(): JSX.Element {
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
            <PostList postList={getAllPosts()} />
            {/* <div> There is nothing here </div> */}
          </div>
        </Layout>
      </Auth>
    </>
  )
}
