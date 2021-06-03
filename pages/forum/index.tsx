import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import ForumHome from '../../components/forum/ForumHome'
import { getAllPosts } from '../../components/forum/ForumAPI'
import ForumLayout from '../../components/forum/ForumLayout'

export default function Forum({ postList }): JSX.Element {
  return (
    <>
      <Head>
        <title>Forum</title>
        <meta name="description" content="Forum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ForumLayout postList={postList} isIndex={true}>
        <div className="flex content-center justify-center self-center">
          <ForumHome />
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
