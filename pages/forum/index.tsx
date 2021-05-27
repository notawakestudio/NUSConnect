import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import Auth from '../../components/common/Auth'
import Layout from '../../components/common/Layout'
import Empty from '../../components/forum/Empty'
import { getAllPosts } from '../../components/forum/ForumAPI'
import PostList from '../../components/forum/PostList'

export default function Forum({ postList }): JSX.Element {
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
            <div className="max-w-md min-w-md flex-shrink-0">
              <PostList postList={postList} />
            </div>
            <div className="flex content-center justify-center self-center">
              <Empty />
            </div>
          </div>
        </Layout>
      </Auth>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const postList = getAllPosts()
  return {
    props: {
      postList,
    },
  }
}
