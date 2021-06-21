import { useToast } from '@chakra-ui/react'
import { useSession } from 'next-auth/client'
import React, { useState } from 'react'
import { FaEdit, FaRegThumbsUp } from 'react-icons/fa'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { VscPreview } from 'react-icons/vsc'
import NewReply from '../../components/forum/NewReply'
import LikeButton from '../common/LikeButton'
import TextContainer from '../common/TextContainer'
import { renderMdToHtml, timeSince } from '../common/Util'
import { deleteReply, Reply, updateReplyLikes } from './ForumAPI'

const ReplyListItem = ({ reply }: { reply: Reply }): JSX.Element => {
  const currentReply = reply
  const lastEdited = timeSince(currentReply.edited_date)
  const [editing, setEditing] = useState(false)
  const [session] = useSession()
  const [liked, setLiked] = useState(false)
  const [upVotes, setUpVotes] = useState(currentReply.up_votes)
  const toast = useToast()

  return (
    <TextContainer>
      <a className="flex items-center border-b border-grey-200 flex-grow py-2 dark:bg-gray-800">
        <div className="flex justify-between px-2 flex-grow">
          <div className="text-sm title-font font-medium text-gray-400 dark:text-gray-100">
            {currentReply.author_id}
          </div>
          <div className="text-sm title-font font-medium text-gray-400 dark:text-gray-100">
            {lastEdited} ago {currentReply.is_edited ? '(edited)' : ''}
          </div>
        </div>
      </a>
      <div className="px-6 py-4">
        {editing ? (
          <NewReply
            postId={currentReply.post_id}
            content={currentReply.content}
            id={currentReply.id}
            label="Edit comment"
            setEditing={setEditing}
          />
        ) : (
          <p className="leading-relaxed mb-6">
            {
              <span
                className="prose-sm lg:prose dark:text-white"
                dangerouslySetInnerHTML={{ __html: renderMdToHtml(currentReply.content) }}
              />
            }
          </p>
        )}
        <div className="flex justify-items-end">
          {session && session.user.name === currentReply.author_id ? (
            <>
              <button
                onClick={() => setEditing(!editing)}
                className="text-gray-400 inline-flex items-center text-sm">
                {editing ? <VscPreview className="w-4 h-4" /> : <FaEdit className="w-4 h-4" />}
              </button>
              <button
                onClick={() => {
                  setEditing(!editing)
                  toast({
                    title: 'Deleted',
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                    position: 'top-right',
                  })
                  deleteReply(currentReply.id, currentReply.post_id)
                }}
                className="text-gray-400 mr-2 inline-flex items-center text-sm">
                {editing ? <RiDeleteBin5Line className="w-4 h-4" /> : ''}
              </button>
            </>
          ) : (
            <></>
          )}
          <LikeButton
            key={currentReply.id}
            likeCount={currentReply.up_votes}
            handleUpdate={() => {
              updateReplyLikes(currentReply.up_votes + 1, currentReply.id)
            }}
          />
        </div>
      </div>
    </TextContainer>
  )
}

export default ReplyListItem
