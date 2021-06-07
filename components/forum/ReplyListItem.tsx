import { renderMdToHtml, timeSince } from '../common/Util'
import { deleteReply, Reply, updateReplyLikes } from './ForumAPI'
import TextContainer from './TextContainer'
import { FaEdit, FaRegThumbsUp } from 'react-icons/fa'
import NewReply from '../../components/forum/NewReply'
import { useState } from 'react'
import { VscPreview } from 'react-icons/vsc'
import { useSession } from 'next-auth/client'
import { toast } from 'react-toastify'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { useRouter } from 'next/router'

const ReplyListItem = ({ reply }: { reply: Reply }): JSX.Element => {
  const currentReply = reply
  const lastEdited = timeSince(currentReply.edited_date)
  const [editing, setEditing] = useState(false)
  const [session] = useSession()
  const [liked, setLiked] = useState(false)
  const [upVotes, setUpVotes] = useState(currentReply.up_votes)
  const router = useRouter()
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
                          toast.warn('Deleted! Refreshing!', {
                            onClose: () => router.reload(),
                          })
                          deleteReply(currentReply.id)
                        }}
                        className="text-gray-400 mr-2 inline-flex items-center text-sm">
                        {editing ? <RiDeleteBin5Line className="w-4 h-4" /> : ''}
                      </button>
                </>
          ) : (
            <></>
          )}
          <button
            disabled={liked}
            onClick={() => {
              toast.success('Liked!', {
                autoClose: 3000,
              })
              updateReplyLikes(upVotes + 1, currentReply.id)
              setUpVotes(upVotes + 1)
              setLiked(true)
            }}
            className="text-gray-400 inline-flex items-center ml-auto text-sm py-1">
            <FaRegThumbsUp color={`${liked ? 'black' : ''}`} className="w-4 h-4 mx-2" />
            {upVotes}
          </button>
        </div>
      </div>
    </TextContainer>
  )
}

export default ReplyListItem
