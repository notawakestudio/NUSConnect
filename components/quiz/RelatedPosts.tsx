import React from 'react'
import { Post } from '../forum/ForumAPI'
import PostListItem from '../forum/PostListItem'
import { QuizMode } from './types'

export default function RelatedPosts({
  post,
  quizMode,
}: {
  post: Post
  quizMode: QuizMode
}): JSX.Element {
  return (
    <div>
      {post !== undefined && quizMode === QuizMode.REVIEWING && (
        <div className="border border-indigo-300 rounded-lg h-full flex-1 font-sans">
          <div className="flex flex-col p-2">
            <p className="text-xl mb-10">Related posts</p>
            <PostListItem post={post} />
          </div>
        </div>
      )}
    </div>
  )
}
