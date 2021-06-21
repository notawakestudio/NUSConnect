import React from 'react'
import { Post } from '../forum/ForumAPI'
import PostListItem from '../forum/PostListItem'
import { QuizMode } from './types'

export default function RelatedPosts({
  posts,
  quizMode,
}: {
  posts: Post[]
  quizMode: QuizMode
}): JSX.Element {
  return (
    <div>
      {posts !== undefined && quizMode === QuizMode.REVIEWING && posts.length !== 0 && (
        <div className="border border-indigo-300 rounded-lg h-full flex-1 font-sans">
          <div className="flex flex-col p-2">
            <p className="text-xl mb-10">Related posts</p>
            {posts.map((post) => (
              <PostListItem post={post} key={post.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
