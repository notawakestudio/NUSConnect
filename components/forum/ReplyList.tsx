import { Reply } from './ForumAPI'
import ReplyListItem from './ReplyListItem'

const ReplyList = ({ replies }: { replies: Reply[] }): JSX.Element => {
  return (
    <div className="flex-row space-y-8">
      {replies.map((reply) => (
        <ReplyListItem key={reply.id} reply={reply}></ReplyListItem>
      ))}
    </div>
  )
}

export default ReplyList
