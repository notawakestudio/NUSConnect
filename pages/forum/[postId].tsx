import Head from 'next/head'
import { Reply, useAllPosts, useAllRelatedReplies } from '../../components/forum/ForumAPI'
import NewReply from '../../components/forum/NewReply'
import PostMain from '../../components/forum/PostMain'
import ReplyList from '../../components/forum/ReplyList'
import { useRouter } from 'next/router'
import { Skeleton } from '@chakra-ui/skeleton'

export default function CurrentPost({ replyList }: { replyList: Reply[] }): JSX.Element {
  const router = useRouter()
  const { postId } = router.query
  const { posts } = useAllPosts()
  const { replies, isLoading } = useAllRelatedReplies(replyList, postId as string)
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
      <div className="flex flex-col space-y-4 lg:ml-4 lg:space-y-8">
        {isLoading ? (
          <Skeleton height="200px" isLoaded={!isLoading}></Skeleton>
        ) : (
          <>
            <PostMain post={posts.filter((post) => post.id === postId)[0]} />
            <ReplyList replies={replies} />
          </>
        )}
        <NewReply postId={postId as string} />
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
//     fallback: true,
//   }
// }

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const postId = params.postId as string
//   // const currentPost = await getPostById(postId)
//   const replyList = await getRelatedReplies(postId)

//   return {
//     props: {
//       replyList,
//       postId,
//     },
//     revalidate: 5, // In seconds
//   }
// }
