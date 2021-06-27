import { Button, useToast } from '@chakra-ui/react'
import { timeSince } from '../common/Util'
import { markMessageAsRead, Message } from '../profile/UserAPI'
import { useUserId } from '../store/user'

export default function MessageSection({ message }: { message: Message }): JSX.Element {
  const userId = useUserId()
  const toast = useToast()
  return (
    <div className="py-4 flex flex-wrap md:flex-nowrap">
      <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
        <span className="font-semibold title-font text-gray-700">
          {message.read ? 'Read' : 'Unread'}
        </span>
        <span className="mt-1 text-gray-500 text-sm">{timeSince(message.created_date)}</span>
      </div>
      <div className="md:flex-grow -mt-8 prose-sm">
        <span dangerouslySetInnerHTML={{ __html: message.content }} />
        {message.read ? null : (
          <Button
            onClick={() => {
              markMessageAsRead(userId, message.id)
              toast({
                title: 'Success!',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
              })
            }}
            className="text-indigo-500 inline-flex items-center mt-4">
            Mark as read
          </Button>
        )}
      </div>
    </div>
  )
}
