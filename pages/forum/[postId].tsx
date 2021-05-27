import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import Layout from '../../components/common/Layout'
import {
  getAllPostId,
  getAllPosts,
  getPostById,
  getRelatedReplies,
  Post,
  Reply,
} from '../../components/forum/ForumAPI'
import PostList from '../../components/forum/PostList'
import PostMain from '../../components/forum/PostMain'
import ReplyList from '../../components/forum/ReplyList'

export default function CurrentPost({
  currentPost,
  postList,
  replies,
}: {
  currentPost: Post
  postList: Post[]
  replies: Reply[]
}): JSX.Element {
  return (
    <>
      <Head>
        <title>Forum</title>
        <meta name="description" content="Forum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex mt-10">
          <div className="max-w-md min-w-md flex-shrink-0">
            <PostList postList={postList} />
          </div>
          <div className="flex-grow flex-col">
            <PostMain post={currentPost} />
            <ReplyList replies={replies} />
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
  const replies = getRelatedReplies(postId)

  return {
    props: {
      currentPost,
      postList,
      replies,
    },
  }
}
