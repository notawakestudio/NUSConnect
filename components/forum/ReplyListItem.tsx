import { Reply } from './ForumAPI'
import TextContainer from './TextContainer'

const ReplyListItem = ({ reply }: { reply: Reply }): JSX.Element => {
  const currentReply = reply

  return (
    <div className="mt-10">
      <TextContainer>
        <div className="p-12">
          <p className="leading-relaxed mb-8">{currentReply.content}</p>
          <div className="flex items-center flex-wrap pt-4 mt-4 border-t-2 border-gray-200">
            <a className="inline-flex items-center mt-4">
              <span className="flex flex-col">
                <span className="title-font font-medium text-gray-900">
                  {currentReply.author_id}{' '}
                </span>
                <span className="text-gray-400 text-xs tracking-widest mt-0.5">Level 10</span>
              </span>
            </a>
          </div>
        </div>
      </TextContainer>
    </div>
  )
}

export default ReplyListItem
