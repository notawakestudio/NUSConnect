import { deletePost, Post, updatePostLikes } from './ForumAPI'
import { FaEdit, FaRegComment, FaRegThumbsUp } from 'react-icons/fa'
import { renderMdToHtml, shuffleStringArray, timeSince } from '../common/Util'
import TextContainer from '../common/TextContainer'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import NewPost from './NewPost'
import { useSession } from 'next-auth/client'
import { VscPreview } from 'react-icons/vsc'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { useRouter } from 'next/router'
import {
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
import { Question } from '../quiz/types'
import { fetchQuestionById } from '../quiz/QuizAPI'
const PostMain = ({ post }: { post: Post }): JSX.Element => {
  const currentPost = post
  const tags = currentPost.tags
  const lastEdited = timeSince(currentPost.edited_date)
  const [upVotes, setUpVotes] = useState(currentPost.up_votes)
  const [liked, setLiked] = useState(false)
  const [editing, setEditing] = useState(false)
  const [session] = useSession()
  const [question, setQuestion] = useState<Question>(undefined)
  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(() => {
    if (post?.related_question_id) {
      fetchQuestionById(post.related_question_id).then((question) => setQuestion(question))
    }
  }, [post?.related_question_id])
  const router = useRouter()
  return (
    <TextContainer>
      <a className="flex items-center border-b border-grey-200 flex-grow py-2 ">
        <div className="flex justify-between px-2 flex-grow text-xs sm:text-sm font-medium text-gray-400 dark:text-gray-100">
          <span>{currentPost.author_id}</span>
          <span>
            {lastEdited} ago {currentPost.is_edited ? '(edited)' : ''}
          </span>
        </div>
      </a>
      <div className="px-6 py-4">
        <h2 className="text-xl font-medium text-indigo-500 dark:text-indigo-400 mb-2">
          {currentPost.title}
        </h2>
        {editing ? (
          <NewPost label="Edit post" currentPost={currentPost} setEditing={setEditing} />
        ) : (
          <p className="leading-relaxed mb-6">
            {
              <span
                className="prose-sm lg:prose dark:text-white font-normal"
                dangerouslySetInnerHTML={{ __html: renderMdToHtml(currentPost.content) }}
              />
            }
          </p>
        )}
        <div className="flex items-center">
          {session && session.user.name === currentPost.author_id ? (
            <>
              <button
                onClick={() => setEditing(!editing)}
                className="text-gray-400 mr-2 inline-flex items-center text-sm">
                {editing ? <VscPreview className="w-4 h-4" /> : <FaEdit className="w-4 h-4" />}
              </button>
              <button
                onClick={() => {
                  setEditing(!editing)
                  deletePost(currentPost.id)
                  router.push('/forum', undefined, { shallow: true })
                }}
                className="text-gray-400 mr-2 inline-flex items-center text-sm">
                {editing ? <RiDeleteBin5Line className="w-4 h-4" /> : ''}
              </button>
            </>
          ) : (
            <></>
          )}
          <div className="flex flex-wrap justify-start items-center">
            {tags.map((tag) => (
              <div key={tag} className="mr-2 mb-1">
                <div className="text-xs py-1.5 px-4 text-gray-600 bg-blue-100 rounded-2xl">
                  #{tag}
                </div>
              </div>
            ))}
          </div>
          {question !== undefined && (
            <>
              <Button onClick={onOpen}>See Question</Button>
              <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>{`${question.type}: ${currentPost?.related_question_id}`}</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <p
                      className="text-left shadow-lg rounded-2xl bg-white dark:bg-gray-800 p-4 dark:text-white mb-2 prose lg:prose-lg"
                      dangerouslySetInnerHTML={{ __html: renderMdToHtml(question.question) }}></p>
                    <div className="divide-y-4 divide-dashed">
                      {shuffleStringArray([
                        ...question.incorrect_answers,
                        ...question.correct_answers,
                      ]).map((answer) => (
                        <p
                          key={answer}
                          className="text-left prose lg:prose-lg"
                          dangerouslySetInnerHTML={{ __html: renderMdToHtml(answer) }}></p>
                      ))}
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          )}
          <button
            disabled={liked}
            onClick={() => {
              toast.success('Liked!', {
                autoClose: 3000,
              })
              setUpVotes(upVotes + 1)
              updatePostLikes(upVotes + 1, currentPost.id)
              setLiked(true)
            }}
            className="text-gray-400 mr-3 inline-flex items-center ml-auto text-sm pr-3 py-1 border-r-2 border-gray-200">
            <FaRegThumbsUp color={`${liked ? 'black' : ''}`} className="w-4 h-4 mx-2" />
            {upVotes}
          </button>
          <span className="text-gray-400 inline-flex items-center text-sm">
            <FaRegComment className="w-4 h-4 mr-2" />6
          </span>
        </div>
      </div>
    </TextContainer>
  )
}

export default PostMain
