import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import { getAllPosts, getAllTags, Post } from '../../components/forum/ForumAPI'
import ForumLayout from '../../components/forum/ForumLayout'
import NewPost from '../../components/forum/NewPost'

export default function CreatePost({
  postList,
  tags,
}: {
  postList: Post[]
  tags: string[]
}): JSX.Element {
  return (
    <>
      <Head>
        <title>New Post</title>
        <meta name="description" content="Forum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ForumLayout postList={postList}>
        <div className="flex-grow flex-col">
          <NewPost tags={tags} />
        </div>
      </ForumLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const postList = await getAllPosts()
  // const tags = await getAllTags() // TODO: FIX THIS
  const tags = ['question','lecture1']
  return {
    props: {
      postList,
      tags
    },
    revalidate: 10, // In seconds
  }
}
