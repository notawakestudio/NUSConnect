import Head from 'next/head'
import NewReply from '../../components/forum/NewReply'
import PostMain from '../../components/forum/PostMain'
import ReplyList from '../../components/forum/ReplyList'
import { useRouter } from 'next/router'
import { nanoid } from 'nanoid'

export default function CurrentPost(): JSX.Element {
  const router = useRouter()
  const { postId } = router.query
  return (
    <>
      <Head>
        <title>Forum | NUS Connect</title>
        <meta name="description" content="Forum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col">
        <div className="mt-4 space-y-4">
          <PostMain key={postId as string} postId={postId as string} />
          <ReplyList postId={postId as string} />
          <NewReply key={nanoid()} postId={postId as string} />
        </div>
      </div>
    </>
  )
}
