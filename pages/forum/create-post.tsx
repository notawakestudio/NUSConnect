import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import { getAllPosts, Post } from '../../components/forum/ForumAPI'
import ForumLayout from '../../components/forum/ForumLayout'
import NewPost from '../../components/forum/NewPost'

export default function CreatePost({
  postList,
}: {
  postList: Post[]
}): JSX.Element {
  return (
    <>
      <Head>
        <title>New Post | NUS Connect</title>
        <meta name="description" content="Forum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ForumLayout postList={postList}>
        <div className="flex-grow flex-col">
          <NewPost />
        </div>
      </ForumLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const postList = await getAllPosts()
  return {
    props: {
      postList,
    },
    revalidate: 5, // In seconds
  }
}
