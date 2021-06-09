import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import {
  getAllPostId,
  getAllPosts,
  getPostById,
  getRelatedReplies,
  Post,
  Reply,
  useAllPosts,
  useAllRelatedReplies,
  usePost,
} from '../../components/forum/ForumAPI'
import ForumLayout from '../../components/forum/ForumLayout'
import NewReply from '../../components/forum/NewReply'
import PostMain from '../../components/forum/PostMain'
import ReplyList from '../../components/forum/ReplyList'
import { useRouter } from 'next/router'

export default function CurrentPost({
  currentPost,
  postList,
  replyList,
  postId,
}: {
  currentPost: Post
  postList: Post[]
  replyList: Reply[]
  postId:  string
}): JSX.Element {
  const router = useRouter()
  const { posts } = useAllPosts(postList)
  const { post } = usePost(currentPost, postId)
  const { replies } = useAllRelatedReplies(replyList, postId)
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <>
      <Head>
        <title>Forum | NUS Connect</title>
        <meta name="description" content="Forum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ForumLayout postList={posts}>
        <div className="flex flex-col space-y-4 lg:ml-4 lg:space-y-8">
          <PostMain post={post} />
          <ReplyList replies={replies} />
          <NewReply postId={postId} />
        </div>
      </ForumLayout>
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
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postId = params.postId as string
  const currentPost = await getPostById(postId)
  const postList = await getAllPosts()
  const replyList = await getRelatedReplies(postId)

  return {
    props: {
      currentPost,
      postList,
      replyList,
      postId,
    },
    revalidate: 5, // In seconds
  }
}
