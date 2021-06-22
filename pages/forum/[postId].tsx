import Head from 'next/head'
import { useAllRelatedReplies } from '../../components/forum/ForumAPI'
import NewReply from '../../components/forum/NewReply'
import PostMain from '../../components/forum/PostMain'
import ReplyList from '../../components/forum/ReplyList'
import { useRouter } from 'next/router'
import { Skeleton } from '@chakra-ui/skeleton'
import { nanoid } from 'nanoid'

export default function CurrentPost(): JSX.Element {
  // {
  //   replyList,
  // }: {
  //   replyList: Reply[]
  //   currentPost: Post
  // }
  const router = useRouter()
  const { postId } = router.query
  const { replies, isLoading: replyIsLoading } = useAllRelatedReplies(postId as string)
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  // if (router.isFallback) {
  //   return <div>Loading...</div>
  // }
  return (
    <>
      <Head>
        <title>Forum | NUS Connect</title>
        <meta name="description" content="Forum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col space-y-4 lg:ml-4 lg:space-y-6 mt-4">
        <PostMain key={postId as string} postId={postId as string} />
        {replyIsLoading ? (
          <Skeleton height="200px" isLoaded={!replyIsLoading}></Skeleton>
        ) : (
          <ReplyList replies={replies} />
        )}
        <NewReply key={nanoid()} postId={postId as string} />
      </div>
    </>
  )
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const postsToLoad = await getAllPostId()
//   const paths = postsToLoad.map((postId) => {
//     return {
//       params: postId,
//     }
//   })
//   return {
//     paths,
//     fallback: false,
//   }
// }

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const postId = params.postId as string
//   // const currentPost = await getPostById(postId)
//   const replyList = await getRelatedReplies(postId)
//   return {
//     props: {
//       replyList,
//       currentPost,
//     },
//   }
// }
