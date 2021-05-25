import Link from 'next/link'

const PostListItem = ({ post }): JSX.Element => {
  const tags = post.tags

  return (
    <Link href="/forum/[forumId]" as={`/forum/${post.id}`}>
      <div className="overflow-hidden shadow-lg rounded-lg h-full w-full md:w-full cursor-pointer mb-1">
        <a href="#" className="w-full block h-full">
          <div className="bg-white dark:bg-gray-800 hover:bg-gray-200 w-full p-4">
            <p className="text-indigo-400 text-sm font-small">{post.title}</p>
            <p className="text-gray-500 dark:text-gray-300 font-light text-sm">{post.content}</p>
            <div className="flex flex-wrap justify-starts items-center mt-4">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="text-xs mr-2 py-1.5 px-4 text-gray-600 bg-blue-100 rounded-2xl">
                  #{tag}
                </div>
              ))}
            </div>
          </div>
        </a>
      </div>
    </Link>
  )
}

export default PostListItem
