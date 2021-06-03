import { renderMdToHtml, showCurrentDateTime } from '../common/Util'
import { Reply } from './ForumAPI'
import TextContainer from './TextContainer'
import { FaRegThumbsUp } from 'react-icons/fa'


const ReplyListItem = ({ reply }: { reply: Reply }): JSX.Element => {
  const currentReply = reply
  const lastEdited = showCurrentDateTime(currentReply.edited_date)

  return (
    <TextContainer>
      <a className="flex items-center border-b border-grey-200 flex-grow py-2 dark:bg-gray-800">
        <div className="flex justify-between px-2 flex-grow">
          <div className="text-sm title-font font-medium text-gray-400 dark:text-gray-100">
            {currentReply.author_id}
          </div>
          <div className="text-sm title-font font-medium text-gray-400 dark:text-gray-100">
            Last edited at {lastEdited}
          </div>
        </div>
      </a>
      <div className="px-6 py-4">
        <p className="leading-relaxed mb-6">
          {
            <span
              className="prose-sm lg:prose dark:text-white"
              dangerouslySetInnerHTML={{ __html: renderMdToHtml(currentReply.content) }}
            />
          }
        </p>
        <div className="flex justify-items-end">
          <span className="text-gray-400 inline-flex mr-3 items-center ml-auto text-sm pr-3 py-1">
            <FaRegThumbsUp className="w-4 h-4 mx-2" />
            {currentReply.up_votes}
          </span>
        </div>
      </div>
    </TextContainer>
  )
}

export default ReplyListItem
