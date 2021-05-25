import Search from '../common/Search'
import PostListItem from './PostListItem'

const PostList = ({ postList }): JSX.Element => {
  return (
    <div className=" bg-white dark:bg-gray-800">
      <div className="flex flex-col sm:flex-row sm:justify-around">
        <div className="flex items-center justify-start mx-6 mt-10">
          <span className="text-gray-600 dark:text-gray-300 ml-4 text-2xl font-bold">
            <div className="container flex flex-col mx-auto w-full items-center justify-center bg-white dark:bg-gray-800 rounded-t-lg shadow">
              <div className="px-4 py-5 sm:px-6 border-b w-full">
                <h3 className="flex text-lg leading-6 font-medium text-gray-900 dark:text-white justify-center mb-2">
                  All Posts
                </h3>
                <div className="flex justify-center">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-2 rounded">
                    New Post
                  </button>
                  <Search />
                </div>
              </div>
              <h4 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mt-2">
                {' '}
                Week 1
              </h4>
              <ul className="flex flex-col w-auto">
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
