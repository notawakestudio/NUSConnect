import { useRouter } from 'next/router'
import Layout from '../../components/common/Layout'
import TagBar from '../common/TagBar'
import { Post, useAllPosts } from './ForumAPI'
import PostList from './PostList'
import { Spinner } from '@chakra-ui/spinner'
import { useEffect, useState } from 'react'
export default function ForumLayout({
  children,
}: {
  children?: JSX.Element | JSX.Element[]
}): JSX.Element {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const { posts, isLoading } = useAllPosts()
  const [currTag, setCurrTag] = useState('')
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])

  useEffect(() => {
    async function fn() {
      if (currTag === '' && query === '') {
        return setFilteredPosts(posts)
      }
      if (currTag !== '') {
        const filteredPosts = posts.filter((post) => {
          return post.tags.includes(currTag)
        })
        setFilteredPosts(
          filteredPosts.filter(
            (post) =>
              post.content.toLowerCase().includes(query.toLowerCase()) ||
              post.title.toLowerCase().includes(query.toLowerCase())
          )
        )
      } else {
        setFilteredPosts(
          filteredPosts.filter(
            (post) =>
              post.content.toLowerCase().includes(query.toLowerCase()) ||
              post.title.toLowerCase().includes(query.toLowerCase())
          )
        )
      }
    }
    if (!isLoading) {
      fn()
    }
  }, [isLoading, currTag, query, posts])
  return (
    <>
      <div className="dark:bg-gray-800 w-full">
        <Layout>
          <TagBar currTag={currTag} setCurrTag={setCurrTag} />
          <div className="inline lg:flex">
            <div
              className={`${
                router.pathname === '/forum' ? '' : 'hidden lg:flex flex-shrink-0'
              } lg:w-96 xl:max-w-md mx-2`}>
              {isLoading ? (
                <Spinner size="xl" />
              ) : (
                <PostList
                  postList={filteredPosts}
                  isLoading={isLoading}
                  query={query}
                  setQuery={setQuery}
                />
              )}
            </div>
            <div className="mx-2 flex-grow">{children}</div>
          </div>
        </Layout>
      </div>
    </>
  )
}
