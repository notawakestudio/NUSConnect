import Head from 'next/head'
import React, { Context, useState } from 'react'
import { useRouter } from 'next/router'
import Footer from '../../../components/common/Footer'
import NavBar from '../../../components/common/NavBar'
import Post from '../../../components/forum/Post'
import PostList from '../../../components/forum/PostList'
import PostData from '../../../public/data/ForumData.json'
import Layout from '../../../components/common/Layout'

const CurrentPost = ({ currentPost }) => {
  // const router = useRouter()
  // const { id } = router.query

  return (
    <>
      <Head>
        <title>Forum</title>
        <meta name="description" content="Forum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex flex-auto">
          <PostList postList={PostData} />
          <Post id={currentPost.id} />
        </div>
      </Layout>
    </>
  )

  // return <div>This is an post {currentPost.id} </div>
}

export const getServerSideProps = async (context) => {
  const currentPost = PostData[context.params.id - 1]

  return {
    props: {
      currentPost,
    },
  }
}

export default CurrentPost
