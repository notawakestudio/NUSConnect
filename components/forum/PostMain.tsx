import { deletePost, updatePostLikes, usePost } from './ForumAPI'
import { FaEdit, FaRegComment } from 'react-icons/fa'
import { renderMdToHtml, timeSince } from '../common/Util'
import TextContainer from '../common/TextContainer'
import { useState } from 'react'
import NewPost from './NewPost'
import { useSession } from 'next-auth/client'
import { VscPreview } from 'react-icons/vsc'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { useRouter } from 'next/router'
import ModelQuestionCard from './ModelQuestionCard'
import { Skeleton } from '@chakra-ui/skeleton'
import LikeButton from '../common/LikeButton'
const PostMain = ({ postId }: { postId: string }): JSX.Element => {
  const { post: currentPost, isLoading } = usePost(postId)
  const [session] = useSession()
  const [editing, setEditing] = useState(false)
  const router = useRouter()
  return (
    <TextContainer>
      {isLoading ? (
        <Skeleton height="200px" isLoaded={!isLoading}></Skeleton>
      ) : (
        <>
          <a className="flex items-center border-b border-grey-200 flex-grow py-2 ">
            <div className="flex justify-between px-2 flex-grow text-xs sm:text-sm font-medium text-gray-400 dark:text-gray-100">
              <span>{currentPost.author_id}</span>
              <span>
                {timeSince(currentPost.edited_date)} ago {currentPost.is_edited ? '(edited)' : ''}
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
                {currentPost.tags.map((tag) => (
                  <div key={tag} className="mr-2 mb-1">
                    <div className="text-xs py-1.5 px-4 text-gray-600 bg-blue-100 rounded-2xl">
                      #{tag}
                    </div>
                  </div>
                ))}
              </div>
              {currentPost.related_question_id ? (
                <ModelQuestionCard questionId={currentPost.related_question_id as string} />
              ) : null}
              <LikeButton
                key={postId}
                likeCount={currentPost.up_votes}
                handleUpdate={() => {
                  updatePostLikes(currentPost.up_votes + 1, currentPost.id)
                }}
              />
              <span className="text-gray-400 inline-flex items-center text-sm">
                <FaRegComment className="w-4 h-4 mr-2" />6
              </span>
            </div>
          </div>
        </>
      )}
    </TextContainer>
  )
}

export default PostMain
