import { Reply } from './ForumAPI'
import ReplyListItem from './ReplyListItem'

const ReplyList = ({ replies }: { replies: Reply[] }): JSX.Element => {
  return (
    <div>
      {replies.map((reply) => (
        <ReplyListItem key={reply.id} reply={reply}></ReplyListItem>
      ))}
    </div>
  )
}

export default ReplyList
