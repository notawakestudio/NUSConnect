import { GetStaticProps } from 'next'
import Head from 'next/head'
import ForumHome from '../../components/forum/ForumHome'
import { getAllPosts, useAllPosts } from '../../components/forum/ForumAPI'
import ForumLayout from '../../components/forum/ForumLayout'

export default function Forum({ postList }): JSX.Element {
  const { posts } = useAllPosts(postList)
  return (
    <>
      <Head>
        <title>Forum | NUS Connect</title>
        <meta name="description" content="Forum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ForumLayout postList={posts}>
        <div className="container items-center justify-center">
          <ForumHome postCount={posts.length} />
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
