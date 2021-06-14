import Link from 'next/link'
import Search from '../common/Search'
import { Post } from './ForumAPI'
import PostListItem from './PostListItem'

const PostList = ({ postList }: { postList: Post[] }): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-start bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 max-h-screen">
      <div className="px-2 py-4 border-b">
        <span className="flex text-lg leading-4 font-medium justify-center mb-2">All Posts</span>
        <div className="flex justify-center">
          <Link href="/forum/create-post">
            <button className="whitespace-nowrap bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-2 rounded-lg">
              New Post
            </button>
          </Link>
          <Search />
        </div>
      </div>
      <div className="overflow-auto ">
        <h4 className="text-lg leading-6 font-medium my-2 text-center">Week 1</h4>
        <div className="flex flex-col ">
          {postList
            .sort((postA, postB) => (postA.edited_date < postB.edited_date ? 1 : -1))
            .map((post) => {
              return <PostListItem key={post.id} post={post} />
            })}
        </div>
      </div>
    </div>
  )
}

export default PostList
