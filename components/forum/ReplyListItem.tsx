import {
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/client'
import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { ImCancelCircle } from 'react-icons/im'
import { GiGiftOfKnowledge } from 'react-icons/gi'
import NewReply from '../../components/forum/NewReply'
import LikeButton from '../common/LikeButton'
import TextContainer from '../common/TextContainer'
import { renderMdToHtml, timeSince } from '../common/Util'
import { deleteReply, Reply, updateReplyLikes } from './ForumAPI'
import NewPost from './NewPost'
import { nanoid } from 'nanoid'
import DisplayName from '../profile/DisplayName'
import { useUserId } from '../store/user'
import { useUser } from '../profile/UserAPI'

const ReplyListItem = ({ reply }: { reply: Reply }): JSX.Element => {
  const currentReply = reply
  const lastEdited = timeSince(currentReply.edited_date)
  const [editing, setEditing] = useState(false)
  const [session] = useSession()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const userId = useUserId()
  const { user, isLoading: userLoading } = useUser()
  const role = userLoading ? 'student' : user.role
  return (
    <TextContainer>
      <a className="flex items-center border-b border-grey-200 flex-grow py-2 dark:bg-gray-800">
        <div className="flex justify-between px-6 flex-grow">
          <div className="text-sm title-font font-medium text-gray-400 dark:text-gray-100">
            <DisplayName author_id={currentReply.author_id} />
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
          {(session && userId === currentReply.author_id) || role === 'admin' ? (
            <>
              <button
                onClick={() => setEditing(!editing)}
                className="text-gray-400 inline-flex items-center text-sm">
                {editing ? (
                  <>
                    <ImCancelCircle className="w-4 h-4 mr-1" />
                    <span>cancel</span>
                  </>
                ) : (
                  <>
                    <span>edit</span>
                    <FaEdit className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
              <button
                onClick={onOpen}
                className="text-gray-400 inline-flex items-center text-sm mx-2">
                {editing ? (
                  <>
                    <GiGiftOfKnowledge className="w-4 h-4 ml-1" />
                    <span>make wiki</span>
                  </>
                ) : (
                  <>
                    <span>make wiki</span>
                    <GiGiftOfKnowledge className="w-4 h-4 ml-1" />
                  </>
                )}
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
                {editing ? (
                  <>
                    <RiDeleteBin5Line className="w-4 h-4" />
                    <span>delete</span>
                  </>
                ) : (
                  ''
                )}
              </button>
              <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Make into Wiki</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <NewPost
                      label="Make into wiki"
                      currentPost={{
                        id: nanoid(),
                        author_id: currentReply.author_id,
                        title: '',
                        content: currentReply.content,
                        created_date: 0,
                        edited_date: 0,
                        tags: ['Wiki'],
                        week: '1',
                        reply_count: 0,
                        up_votes: 0,
                        is_edited: false,
                      }}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
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
