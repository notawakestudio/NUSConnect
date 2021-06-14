import { nanoid } from 'nanoid'
import { API_GET_ALL_POST, deletePost, Post, updatePostLikes, useAllPosts } from './ForumAPI'
import { FaEdit, FaRegComment, FaRegThumbsUp } from 'react-icons/fa'
import { renderMdToHtml, timeSince } from '../common/Util'
import TextContainer from '../common/TextContainer'
import { useState } from 'react'
import { toast } from 'react-toastify'
import NewPost from './NewPost'
import { useSession } from 'next-auth/client'
import { VscPreview } from 'react-icons/vsc'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { useRouter } from 'next/router'
import { mutate } from 'swr'

const PostMain = ({ post }: { post: Post }): JSX.Element => {
  const currentPost = post
  const tags = currentPost.tags
  const lastEdited = timeSince(currentPost.edited_date)
  const [upVotes, setUpVotes] = useState(currentPost.up_votes)
  const [liked, setLiked] = useState(false)
  const [editing, setEditing] = useState(false)
  const [session] = useSession()
  const router = useRouter()
  const { posts } = useAllPosts()
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
                  toast.warn('Deleted! Redirecting to forum homepage!', {
                    onClose: () => router.push('/forum'),
                  })
                  // update the local data immediately, but disable the revalidation
                  const updatedPosts = posts.filter((post) => post.id !== currentPost.id)
                  mutate(API_GET_ALL_POST, [...updatedPosts], false)
                  deletePost(currentPost.id)
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
              <div className="mr-2 mb-1">
                <div
                  key={tag}
                  className="text-xs py-1.5 px-4 text-gray-600 bg-blue-100 rounded-2xl">
                  #{tag}
                </div>
              </div>
            ))}
          </div>
          <button
            disabled={liked}
            onClick={() => {
              toast.success('Liked!', {
                autoClose: 3000,
              })
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
