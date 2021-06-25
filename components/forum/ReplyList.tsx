import { Reply, useAllRelatedReplies } from './ForumAPI'
import ReplyListItem from './ReplyListItem'
import { Skeleton } from '@chakra-ui/skeleton'
const ReplyList = ({ postId }: { postId: string }): JSX.Element => {
  const { replies, isLoading }: { replies: Reply[]; isLoading: boolean } =
    useAllRelatedReplies(postId)

  return (
    <div className="flex-col space-y-4 lg:space-y-8">
      {isLoading ? (
        <Skeleton height="200px" isLoaded={!isLoading}></Skeleton>
      ) : (
        replies.map((reply) => <ReplyListItem key={reply.id} reply={reply}></ReplyListItem>)
      )}
    </div>
  )
}

export default ReplyList
