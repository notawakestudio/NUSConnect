import forum_data from '../../public/data/ForumData.json'
import reply_data from '../../public/data/ReplyData.json'

export type Post = {
  id: string
  author_id: string
  title: string
  content: string
  created_date: string
  edited_date: string
  tags: string[]
  week: string
  reply_count: string
  up_votes: string
  is_edited: boolean
}

export type Reply = {
  id: string
  post_id: string
  author_id: string
  content: string
  created_date: string
  edited_date: string
  up_votes: string
  is_edited: boolean
}

export const getAllPosts = (): Post[] => {
  return forum_data
}

export const getPostById = (id: string): Post => {
  return getAllPosts().filter((post) => post['id'] === id)[0]
}

export async function getAllPostId(): Promise<{ postId }[]> {
  const posts = getAllPosts()
  return posts.map((post) => {
    return {
      postId: post['id'],
    }
  })
}

export const getAllReplies = (): Reply[] => {
  return reply_data
}

export const getRelatedReplies = (postId: string): Reply[] => {
  const replyList = getAllReplies()
  return replyList.filter((reply) => reply['post_id'] === postId)
}
