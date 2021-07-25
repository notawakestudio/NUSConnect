import { nanoid } from 'nanoid'
import useSWR, { mutate } from 'swr'
import { getCurrentDateTime, getCurrentWeek } from '../common/Util'
import { addPostToUserRecord } from '../profile/UserAPI'
import { useCurrentModule } from '../store/module'

export const API_GET_ALL_POST = 'https://1ieznu.deta.dev/forum/post/'
const API_GET_POST_BY_ID = 'https://1ieznu.deta.dev/forum/post/'
const API_SUBMIT_POST = 'https://1ieznu.deta.dev/post/make'
// const API_GET_ALL_REPLY = 'https://1ieznu.deta.dev/forum/reply'
// const API_GET_REPLY_BY_ID = 'https://1ieznu.deta.dev/forum/reply/'
const API_GET_REPLY_BY_POSTID = 'https://1ieznu.deta.dev/forum/reply/related/'
const API_SUBMIT_REPLY = 'https://1ieznu.deta.dev/reply/make'
const API_UPDATE_REPLY = 'https://1ieznu.deta.dev/reply/update/'
const API_DELETE_REPLY = 'https://1ieznu.deta.dev/reply/delete/'
const API_UPDATE_REPLY_LIKES = 'https://1ieznu.deta.dev/reply/update/likes/'
const API_UPDATE_POST_LIKES = 'https://1ieznu.deta.dev/post/update/likes/'
const API_UPDATE_POST = 'https://1ieznu.deta.dev/post/update/'
const API_DELETE_POST = 'https://1ieznu.deta.dev/post/delete/'
export const allAvailableTags = [
  'Question',
  'Lecture',
  'Quiz',
  'Admin',
  'week1',
  'week2',
  'week3',
  'week4',
  'week5',
  'week6',
  'week7',
  'week8',
  'week9',
  'week10',
  'week11',
  'week12',
  'week13',
  'Wiki',
]

export type Post = {
  id: string
  author_id: string
  title: string
  content: string
  created_date: number
  edited_date: number
  tags: string[]
  week: number
  reply_count: number
  up_votes: number
  is_edited: boolean
  related_question_id?: string
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

export const useAllPosts = () => {
  const {
    state: { moduleId },
  } = useCurrentModule()
  const { data, error, mutate } = useSWR(API_GET_ALL_POST + moduleId, fetcher)
  return {
    posts: data as Post[],
    isLoading: !error && !data,
    mutate: mutate,
  }
}

export const useAllRelatedReplies = (
  postId: string
): { replies: Reply[]; isLoading: boolean; isError: any } => {
  const {
    state: { moduleId },
  } = useCurrentModule()
  const { data, error } = useSWR(API_GET_REPLY_BY_POSTID + moduleId + '/' + postId, fetcher)
  return {
    replies: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const usePost = (postId: string): { post: Post; isLoading: boolean } => {
  const {
    state: { moduleId },
  } = useCurrentModule()
  const { data, error } = useSWR(API_GET_POST_BY_ID + moduleId + '/' + postId, fetcher)
  return {
    post: data,
    isLoading: !error && !data,
  }
}

export const getAllPosts = async (moduleId: string): Promise<Post[]> => {
  return fetch(API_GET_ALL_POST + moduleId).then((response) => response.json())
}

export async function getAllPostId(): Promise<{ postId: string }[]> {
  const posts = await getAllPosts('RFfQyW-oenP9ZW5UQhTtd')
  const posts2 = await getAllPosts('kMvp8b48SmTiXXCl7EAkc')
  return [...posts, ...posts2].map((post) => {
    return {
      postId: post['id'],
    }
  })
}

export async function getAllPostsByQuestionId(question_id: string): Promise<Post[]> {
  const posts = await getAllPosts('RFfQyW-oenP9ZW5UQhTtd')
  const posts2 = await getAllPosts('kMvp8b48SmTiXXCl7EAkc')
  return [...posts, ...posts2].filter((post) => post.related_question_id === question_id)
}

export function makePost(moduleId: string, post: string[]): void {
  const currDate = getCurrentDateTime()
  const requestBody: { moduleId: string; post: Post } = {
    moduleId: moduleId,
    post: {
      id: nanoid(),
      author_id: post['author'],
      title: post['title'],
      content: post['content'],
      created_date: currDate,
      edited_date: currDate,
      tags: post['tags'],
      week: getCurrentWeek(),
      reply_count: 0,
      up_votes: 0,
      is_edited: false,
      related_question_id: post['related_question_id'] ?? '',
    },
  }

  fetch(API_SUBMIT_POST, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(requestBody),
  }).then(() => {
    // trigger a revalidation (refetch) to make sure our local data is correct
    addPostToUserRecord(post['author'], moduleId, requestBody['post']['id'])
    mutate(API_GET_ALL_POST + moduleId)
  })
}

export function makeReply(moduleId: string, reply: string[], postId: string): void {
  const currDate = getCurrentDateTime()

  const requestBody: { moduleId: string; reply: Reply } = {
    moduleId: moduleId,
    reply: {
      id: nanoid(),
      post_id: postId,
      author_id: reply['author'],
      content: reply['content'],
      created_date: currDate,
      edited_date: currDate,
      up_votes: 0,
      is_edited: false,
    },
  }
  mutate(
    API_GET_REPLY_BY_POSTID + moduleId + '/' + postId,
    (replies: Reply[]) => [...replies, requestBody],
    false
  )
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
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(requestBody), // body data type must match "Content-Type" header
  }).then(() => {
    mutate(API_GET_REPLY_BY_POSTID + moduleId + '/' + postId)
  })
}

export function updateReply(
  moduleId: string,
  reply: string[],
  postId: string,
  replyId: string
): void {
  const requestBody = {
    moduleId: moduleId,
    reply: {
      content: reply['content'],
      is_edited: true,
      edited_date: getCurrentDateTime(),
    },
  }
  fetch(API_UPDATE_REPLY + replyId, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(requestBody), // body data type must match "Content-Type" header
  }).then(() => {
    mutate(API_GET_REPLY_BY_POSTID + moduleId + '/' + postId)
  })
}

export function updateReplyLikes(moduleId: string, newCount: number, replyId: string): void {
  const requestBody = {
    moduleId: moduleId,
    reply: {
      up_votes: newCount,
    },
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
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(requestBody), // body data type must match "Content-Type" header
  })
}

export function updatePostLikes(moduleId: string, newCount: number, postId: string): void {
  const requestBody = {
    moduleId: moduleId,
    post: {
      up_votes: newCount,
    },
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
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(requestBody), // body data type must match "Content-Type" header
  }).then(() => {
    mutate(API_GET_POST_BY_ID + moduleId + '/' + postId)
  })
}

export function updatePost(moduleId: string, update: string[], currPost: Post): void {
  const requestBody = {
    moduleId: moduleId,
    post: {
      title: update['title'],
      content: update['content'],
      tags: update['tags'],
      is_edited: true,
      edited_date: getCurrentDateTime(),
      related_question_id: update['related_question_id'],
    },
  }
  if (update['title'] === currPost.title) {
    delete requestBody['post']['title']
  }
  if (update['content'] === currPost.content) {
    delete requestBody['post']['content']
  }
  if (update['tags'] === currPost.tags) {
    delete requestBody['post']['tags']
  }
  if (update['related_question_id'] === currPost.related_question_id) {
    delete requestBody['post']['related_question_id']
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
  }).then(() => {
    mutate(API_GET_POST_BY_ID + moduleId + '/' + currPost.id)
  })
}

export function deletePost(moduleId: string, postId: string): void {
  fetch(API_DELETE_POST + moduleId + '/' + postId, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer',
  }).then(() => {
    mutate(API_GET_ALL_POST + moduleId)
  })
}

export function deleteReply(moduleId: string, replyId: string, postId: string): void {
  mutate(
    API_GET_REPLY_BY_POSTID + moduleId + '/' + postId,
    (replies: Reply[]) => [...replies].filter((reply) => reply.id !== replyId),
    false
  )
  fetch(API_DELETE_REPLY + moduleId + '/' + replyId, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer',
  }).then(() => {
    mutate(API_GET_REPLY_BY_POSTID + moduleId + '/' + postId)
  })
}
