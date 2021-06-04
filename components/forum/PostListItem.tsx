import Link from 'next/link'
import { showCurrentDateTime } from '../common/Util'
import TextContainer from './TextContainer'

const PostListItem = ({ post }): JSX.Element => {
  const tags = post.tags
  const author = post.author_id
  const date = showCurrentDateTime(post.created_date)
  const title = post.title
  const maxLength = 175
  const content = post.content
  const trimmedContent = post.content.substring(0, maxLength) + '...'

  return (
    <Link href={`/forum/${post.id}`}>
      <a href="#" className="w-full block h-full my-2">
        <TextContainer>
          <div className="bg-white dark:bg-gray-800 hover:bg-gray-200 p-4 ">
            <p className="text-grey-800 text-xs font-small">
              {author} posted {date}
            </p>
            <p className="text-indigo-500 dark:text-indigo-400 text-base font-small">{title}</p>
            <p className="text-gray-500 dark:text-gray-300 font-light text-sm overflow-ellipsis overflow-hidden">
              {content.length > maxLength ? trimmedContent : content}
            </p>
            <div className="flex flex-wrap justify-starts items-center mt-2">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="text-xs mr-2 py-1 px-2 text-gray-600 bg-blue-100 rounded-2xl">
                  #{tag}
                </div>
              ))}
            </div>
          </div>
        </TextContainer>
      </a>
    </Link>
  )
}

export default PostListItem
