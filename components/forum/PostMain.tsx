import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast,
} from '@chakra-ui/react'
import { Skeleton } from '@chakra-ui/skeleton'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { FaDirections, FaEdit } from 'react-icons/fa'
import { ImCancelCircle } from 'react-icons/im'
import { RiDeleteBin5Line } from 'react-icons/ri'
import LikeButton from '../common/LikeButton'
import TextContainer from '../common/TextContainer'
import { renderMdToHtml, timeSince } from '../common/Util'
import DisplayName from '../profile/DisplayName'
import { useUser } from '../profile/UserAPI'
import { useUserId } from '../store/user'
import { deletePost, updatePostLikes, usePost } from './ForumAPI'
import ModelQuestionCard from './ModelQuestionCard'
import NewPost from './NewPost'
const PostMain = ({ postId }: { postId: string }): JSX.Element => {
  const { post: currentPost, isLoading } = usePost(postId)
  const [session] = useSession()
  const [editing, setEditing] = useState(false)
  const router = useRouter()

  //Alert Dialog
  const [isOpen, setIsOpen] = useState(false)
  const onClose = (): void => setIsOpen(false)
  const cancelRef = React.useRef()

  const toast = useToast()
  const userId = useUserId()
  const { user, isLoading: userLoading } = useUser()
  const role = userLoading ? 'student' : user.role

  return (
    <>
      <TextContainer>
        {isLoading ? (
          <Skeleton height="200px" isLoaded={!isLoading}></Skeleton>
        ) : (
          <div data-cy="postMain">
            <a className="flex items-center border-b border-grey-200 flex-grow py-2 ">
              <div className="flex justify-between px-2 flex-grow text-xs sm:text-sm font-medium text-gray-400 dark:text-gray-100">
                <DisplayName author_id={currentPost.author_id} />
                <span>
                  {timeSince(currentPost.edited_date)} ago {currentPost.is_edited ? '(edited)' : ''}
                </span>
              </div>
            </a>
            <div className="px-6 py-4">
              {/* <div className="flex items-center pb-2">
              <span className="text-xl font-medium text-indigo-500 dark:text-indigo-400 mr-4">
                {currentPost.title}
              </span>
              {currentPost.related_question_id ? (
                <ModelQuestionCard questionId={currentPost.related_question_id as string} />
              ) : null}
            </div> */}

              {editing ? (
                <NewPost
                  label="Edit Post"
                  currentPost={currentPost}
                  setEditing={setEditing}
                  related_question_id={currentPost.related_question_id}
                />
              ) : (
                <>
                  <div className="flex items-center pb-2">
                    <span className="text-xl font-medium text-indigo-500 dark:text-indigo-400 mr-4">
                      {currentPost.title}
                    </span>
                    {currentPost.related_question_id ? (
                      <ModelQuestionCard questionId={currentPost.related_question_id} />
                    ) : null}
                  </div>
                  <p className={`leading-relaxed ${currentPost.content ? 'mb-4' : 'mb-2'}`}>
                    {
                      <span
                        className="prose-sm lg:prose dark:text-white font-normal"
                        dangerouslySetInnerHTML={{ __html: renderMdToHtml(currentPost.content) }}
                      />
                    }
                  </p>
                  <div className="flex flex-wrap justify-start items-center my-2">
                    {currentPost.tags.map((tag) => (
                      <div key={tag} className="my-1 mr-2">
                        <div className="text-xs py-1.5 px-4 text-gray-600 bg-blue-100 rounded-2xl">
                          #{tag}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div className="flex items-center mt-2">
                {(session && userId === currentPost.author_id) || role === 'admin' ? (
                  <>
                    {editing ? (
                      <>
                        <button
                          onClick={() => setEditing(!editing)}
                          className="text-gray-400 mr-2 inline-flex items-center text-sm">
                          <ImCancelCircle className="w-4 h-4 mr-1" />
                          <span>cancel</span>
                        </button>
                        <button
                          onClick={() => {
                            setEditing(!editing)
                            setIsOpen(true)
                          }}
                          className="text-gray-400 ml-2 inline-flex items-center text-sm">
                          <>
                            <RiDeleteBin5Line className="w-4 h-4 mr-1" />
                            <span>delete post</span>
                          </>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setEditing(!editing)}
                          className="text-gray-400 mr-2 inline-flex items-center text-sm">
                          <span>edit</span>
                          <FaEdit className="w-4 h-4 ml-1" />
                        </button>
                        <button
                          onClick={() => router.push(`/quiz/make-question/${postId}`)}
                          className="text-gray-400 mr-2 inline-flex items-center text-sm">
                          <span>make quiz</span>
                          <FaDirections className="w-4 h-4 ml-1" />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => router.push(`/quiz/make-question/${postId}`)}
                    className="text-gray-400 mr-2 inline-flex items-center text-sm">
                    <span>make quiz</span>
                    <FaDirections className="w-4 h-4 ml-1" />
                  </button>
                )}

                {editing ? null : (
                  <LikeButton
                    key={postId}
                    likeCount={currentPost.up_votes}
                    handleUpdate={() => {
                      updatePostLikes(currentPost.up_votes + 1, currentPost.id)
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </TextContainer>

      {/* Alert dialog for delete confirmation*/}
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Post
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You cannot undo this action afterwards.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  deletePost(currentPost.id)
                  toast({
                    title: 'Post deleted',
                    status: 'warning',
                    duration: 3000,
                    isClosable: true,
                  })
                  router.push('/forum', undefined, { shallow: true })
                }}
                ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default PostMain
