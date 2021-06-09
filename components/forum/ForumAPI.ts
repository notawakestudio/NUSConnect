import { nanoid } from 'nanoid'
import useSWR, { mutate } from 'swr'
import { getCurrentDateTime, getCurrentWeek } from '../common/Util'

export const API_GET_ALL_POST = 'https://1ieznu.deta.dev/forum/post'
const API_GET_POST_BY_ID = 'https://1ieznu.deta.dev/forum/post/'
const API_SUBMIT_POST = 'https://1ieznu.deta.dev/post/make'
const API_GET_ALL_REPLY = 'https://1ieznu.deta.dev/forum/reply'
const API_GET_REPLY_BY_ID = 'https://1ieznu.deta.dev/forum/reply/'
const API_GET_REPLY_BY_POSTID = 'https://1ieznu.deta.dev/forum/reply/related/'
const API_SUBMIT_REPLY = 'https://1ieznu.deta.dev/reply/make'
const API_UPDATE_REPLY = 'https://1ieznu.deta.dev/reply/update/'
const API_UPDATE_REPLY_LIKES = 'https://1ieznu.deta.dev/reply/update/likes/'
const API_UPDATE_POST_LIKES = 'https://1ieznu.deta.dev/post/update/likes/'
const API_UPDATE_POST = 'https://1ieznu.deta.dev/post/update/'

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

const fetcher = (URL: string) => fetch(URL).then((res) => res.json())

export const useAllPosts = (initialData = [] as Post[]) => {
  const { data, error } = useSWR(API_GET_ALL_POST, fetcher, {
    initialData: initialData,
  })
  return {
    posts: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useAllRelatedReplies = (initialData: Reply[], postId: string) => {
  const { data, error } = useSWR(API_GET_REPLY_BY_POSTID + postId, fetcher, {
    initialData: initialData,
  })
  return {
    replies: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const usePost = (initialData: Post, postId: string) => {
  const { data, error } = useSWR(API_GET_POST_BY_ID + postId, fetcher, {
    initialData: initialData,
  })
  return {
    post: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const getAllPosts = async (): Promise<Post[]> => {
  return await fetch(API_GET_ALL_POST).then((response) => response.json())
}

export const getAllReplies = async (): Promise<Reply[]> => {
  return await fetch(API_GET_ALL_REPLY).then((response) => response.json())
}

export const getPostById = async (id: string): Promise<Post> => {
  const post = await fetch(API_GET_POST_BY_ID + id).then((response) =>
    response.json()
  )
  return post
}

export async function getAllPostId(): Promise<{ postId: string }[]> {
  const posts = await getAllPosts()
  return posts.map((post) => {
    return {
      postId: post['id'],
    }
  })
}

export const getRelatedReplies = async (postId: string): Promise<Reply[]> => {
  const replyList = await fetch(API_GET_REPLY_BY_POSTID + postId).then((response) =>
    response.json()
  )
  return replyList
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
  fetch(API_SUBMIT_POST, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(requestBody), // body data type must match "Content-Type" header
  }).then((response) => {
    console.log(response)
    // trigger a revalidation (refetch) to make sure our local data is correct
    mutate(API_GET_ALL_POST)
  })
}

export function makeReply(reply: string[], postId: string): void {
  const currDate = getCurrentDateTime()

  const requestBody: Reply = {
    id: nanoid(),
    post_id: postId,
    author_id: reply['author'],
    content: reply['content'],
    created_date: currDate,
    edited_date: currDate,
    up_votes: 0,
    is_edited: false,
  }
  fetch(API_SUBMIT_REPLY, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(requestBody), // body data type must match "Content-Type" header
  }).then((response) => {
    console.log(response)
    mutate(API_GET_REPLY_BY_POSTID + postId)
  })
}

//to-do update this to a proper tag getter
export async function getAllTags(): Promise<string[]> {
  const post = await getPostById('1a')
  return post.tags
}

export function updateReply(reply: string[], postId: string, replyId: string): void {
  const requestBody = {
    content: reply['content'],
    is_edited: true,
    edited_date: getCurrentDateTime(),
  }
  fetch(API_UPDATE_REPLY + replyId, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(requestBody), // body data type must match "Content-Type" header
  }).then((response) => {
    console.log(response)
    mutate(API_GET_REPLY_BY_POSTID + postId)
  })
}

export function updateReplyLikes(newCount: number, replyId: string): void {
  const requestBody = {
    up_votes: newCount,
  }
  fetch(API_UPDATE_REPLY_LIKES + replyId, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(requestBody), // body data type must match "Content-Type" header
  }).then((response) => {
    console.log(response)
  })
}

export function updatePostLikes(newCount: number, postId: string): void {
  const requestBody = {
    up_votes: newCount,
  }
  fetch(API_UPDATE_POST_LIKES + postId, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(requestBody), // body data type must match "Content-Type" header
  }).then((response) => {
    console.log(response)
    mutate(API_GET_POST_BY_ID + postId)
  })
}

export function updatePost(update: string[], currPost: Post): void {
  const requestBody = {
    title: update['title'],
    content: update['content'],
    tags: update['tags'],
    is_edited: true,
    edited_date: getCurrentDateTime(),
  }
  if (update['title'] === currPost.title) {
    delete requestBody['title']
  }
  if (update['content'] === currPost.content) {
    delete requestBody['content']
  }
  if (update['tags'] === currPost.tags) {
    delete requestBody['tags']
  }
  fetch(API_UPDATE_POST + currPost.id, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(requestBody), // body data type must match "Content-Type" header
  }).then((response) => {
    console.log(response)
    mutate(API_GET_POST_BY_ID + currPost.id)
  })
}

export function deletePost(postId: string): void {
  const requestBody = {}
  fetch(API_UPDATE_POST + postId, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(requestBody), // body data type must match "Content-Type" header
  }).then((response) => {
    console.log(response)
    // trigger a revalidation (refetch) to make sure our local data is correct
    mutate(API_GET_ALL_POST)
  })
}

export function deleteReply(replyId: string, postId: string): void {
  const requestBody = {}
  fetch(API_UPDATE_REPLY + replyId, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(requestBody), // body data type must match "Content-Type" header
  }).then((response) => {
    console.log(response)
    mutate(API_GET_REPLY_BY_POSTID + postId)
  })
}
