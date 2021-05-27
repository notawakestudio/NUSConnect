import Link from 'next/link'
import Search from '../common/Search'
import PostListItem from './PostListItem'

const PostList = ({ postList }): JSX.Element => {
  return (
    <div className=" bg-white dark:bg-gray-800 ">
      <div className="flex flex-col sm:flex-row sm:justify-around">
        <div className="flex items-center justify-start mx-6">
          <span className="text-gray-600 dark:text-gray-300 text-2xl font-bold">
            <div className="container flex flex-col flex-grow mx-auto w-full items-center justify-center bg-white dark:bg-gray-800 rounded-lg ">
              <div className="px-4 py-4 sm:px-6 border-b w-full">
                <h3 className="flex text-lg leading-4 font-medium text-gray-900 dark:text-white justify-center mb-2">
                  All Posts
                </h3>
                <div className="flex justify-center">
                  <Link href="/forum/create-post">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-2 rounded-lg">
                      New Post
                    </button>
                  </Link>
                  <Search />
                </div>
              </div>
              <h4 className="text-lg leading-6 font-medium text-gray-900 dark:text-white my-2">
                {' '}
                Week 1
              </h4>
              <ul className="flex-col">
                {postList.map((post) => {
                  return <PostListItem key={post.id} post={post} />
                })}
              </ul>
            </div>
          </span>
        </div>
      </div>
    </div>
  )
}

export default PostList
