import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import Layout from '../../components/common/Layout'
import { getAllPostId, getAllPosts, getPostById } from '../../components/forum/ForumAPI'
import PostList from '../../components/forum/PostList'
import PostMainItem from '../../components/forum/PostMainItem'

export default function CurrentPost({ currentPost, postList }): JSX.Element {
  return (
    <>
      <Head>
        <title>Forum</title>
        <meta name="description" content="Forum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex">
          <div className="max-w-md">
            <PostList postList={postList} />
          </div>
          <div className="flex-grow">
            <PostMainItem post={currentPost} />
          </div>
        </div>
      </Layout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postsToLoad = await getAllPostId()

  const paths = postsToLoad.map((postId) => {
    return {
      params: postId,
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postId = params.postId as string
  const currentPost = getPostById(postId)
  const postList = getAllPosts()

  return {
    props: {
      currentPost,
      postList,
    },
  }
}
