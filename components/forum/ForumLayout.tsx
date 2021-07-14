import { Spinner } from '@chakra-ui/spinner'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Search, { Design } from '../common/Search'
import TagBar from '../common/TagBar'
import { Post, useAllPosts } from './ForumAPI'
import PostList from './PostList'
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
    async function fn(): Promise<void> {
      if (currTag === '' && query === '') {
        return setFilteredPosts(posts)
      }
      if (currTag !== '') {
        const filterByTag = posts.filter((post) => {
          return post.tags.includes(currTag)
        })
        setFilteredPosts(
          filterByTag.filter(
            (post) =>
              post.content.toLowerCase().includes(query.toLowerCase()) ||
              post.title.toLowerCase().includes(query.toLowerCase())
          )
        )
      } else {
        setFilteredPosts(
          posts.filter(
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
      <div className="dark:bg-gray-800 w-full h-full relative">
        <div className="flex flex-col w-full h-full overflow-hidden">
          <div className="flex flex-row bg-gray-100 dark:bg-gray-700 border-b border-gray-200 p-1 py-2 h-14">
            <div className="flex flex-row justify-center space-x-2">
              <Link href="/forum/create-post">
                <button
                  className="whitespace-nowrap bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-2 rounded-sm shadow-md"
                  data-cy="newPost">
                  New Post
                </button>
              </Link>
              <Search query={query} setQuery={setQuery} design={Design.square} />
            </div>
            <TagBar currTag={currTag} setCurrTag={setCurrTag} />
          </div>
          <div className="forum-container-content">
            <div className="grid grid-cols-8 h-full">
              <div
                className={`${
                  router.pathname === '/forum' ? '' : 'hidden lg:inline'
                } col-span-8 lg:col-span-3 xl:col-span-2 overflow-y-auto`}>
                {isLoading ? (
                  <Spinner size="xl" m={20} p={10} />
                ) : (
                  <div className="border-r border-gray-200 h-full">
                    <PostList postList={filteredPosts} />
                  </div>
                )}
              </div>
              <div className="mx-2 col-span-8 lg:col-span-5 xl:col-span-6 h-full overflow-auto">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
