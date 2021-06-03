import { nanoid } from 'nanoid'
import { renderMdToHtml, showCurrentDateTime } from '../common/Util'
import { Post } from './ForumAPI'
import TextContainer from './TextContainer'
import { FaRegComment, FaRegThumbsUp } from 'react-icons/fa'

const PostMain = ({ post }: { post: Post }): JSX.Element => {
  const currentPost = post
  const tags = currentPost.tags
  const lastEdited = showCurrentDateTime(currentPost.edited_date)

  return (
    <TextContainer>
      <a className="flex items-center border-b border-grey-200 flex-grow py-2 ">
        <div className="flex justify-between px-2 flex-grow">
          <div className="text-sm title-font font-medium text-gray-400 dark:text-gray-50">
            {currentPost.author_id}
          </div>
          <div className="text-sm title-font font-medium text-gray-400 dark:text-gray-50">
            Last edited at {lastEdited}
          </div>
        </div>
      </a>
      <div className="px-6 py-4">
        <h2 className="text-xl title-font font-medium text-indigo-500 dark:text-indigo-400 mb-2">
          {currentPost.title}
        </h2>
        <p className="leading-relaxed mb-6">
          {
            <span
              className="prose-sm lg:prose dark:text-white font-normal"
              dangerouslySetInnerHTML={{ __html: renderMdToHtml(currentPost.content) }}
            />
          }
        </p>
        <div className="flex items-center">
          <div className="flex flex-wrap justify-start items-center">
            {tags.map((tag) => (
              <div
                key={nanoid()}
                className="text-xs mr-2 py-1.5 px-4 text-gray-600 bg-blue-100 rounded-2xl">
                #{tag}
              </div>
            ))}
          </div>
          <span className="text-gray-400 mr-3 inline-flex items-center ml-auto text-sm pr-3 py-1 border-r-2 border-gray-200">
            <FaRegThumbsUp className="w-4 h-4 mx-2" />
            {currentPost.up_votes}
          </span>
          <span className="text-gray-400 inline-flex items-center text-sm">
            <FaRegComment className="w-4 h-4 mr-2" />6
          </span>
        </div>
      </div>
    </TextContainer>
  )
}

export default PostMain
