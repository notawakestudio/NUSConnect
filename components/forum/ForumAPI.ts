import { nanoid } from 'nanoid'
import forum_data from '../../public/data/ForumData.json'
import reply_data from '../../public/data/ReplyData.json'
import { getCurrentDateTime, getCurrentWeek } from '../common/Util'

export type Post = {
  id: string
  author_id: string
  title: string
  content: string
  created_date: number
  edited_date: number
  tags: string[]
  week: string
  reply_count: number
  up_votes: number
  is_edited: boolean
}

export type Reply = {
  id: string
  post_id: string
  author_id: string
  content: string
  created_date: number
  edited_date: number
  up_votes: number
  is_edited: boolean
}

export const getAllPosts = (): Post[] => {
  return forum_data
}

export const getAllReplies = (): Reply[] => {
  return reply_data
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

export const getRelatedReplies = (postId: string): Reply[] => {
  const replyList = getAllReplies()
  return replyList.filter((reply) => reply['post_id'] === postId)
}

export function makePost(post: string[]): void {
  const currDate = getCurrentDateTime()
  const currWeek = getCurrentWeek()

  const requestBody: Post = {
    id: nanoid(),
    author_id: post['author'],
    title: post['title'],
    content: post['content'],
    created_date: currDate,
    edited_date: currDate,
    tags: post['tags'],
    week: currWeek,
    reply_count: 0,
    up_votes: 0,
    is_edited: false,
  }

  console.log(requestBody)
}

export function makeReply(post: string[], postId: string): void {
  const currDate = getCurrentDateTime()

  const requestBody: Reply = {
    id: nanoid(),
    post_id: postId,
    author_id: post['author'],
    content: post['content'],
    created_date: currDate,
    edited_date: currDate,
    up_votes: 0,
    is_edited: false,
  }

  console.log(requestBody)
}

//to-do update this to a proper tag getter
export function getAllTags(): string[] {
  return getPostById('1a').tags
}
