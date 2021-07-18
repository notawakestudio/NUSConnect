import { nanoid } from 'nanoid'
import useSWR, { mutate } from 'swr'
import { getCurrentDateTime } from '../common/Util'
import { addUserToModule } from '../module/ModuleAPI'
import { useUserId } from '../store/user'

const API_MAKE_USER = 'https://1ieznu.deta.dev/user/make'
const API_GET_USER = 'https://1ieznu.deta.dev/user/'
const API_GET_ALL_USER = 'https://1ieznu.deta.dev/user/all'
const API_CHECK_USER = 'https://1ieznu.deta.dev/user/check/'
const API_UPDATE_USER = 'https://1ieznu.deta.dev/user/update/'

const API_GET_MESSAGES_BY_AUTHORID = 'https://1ieznu.deta.dev/user/inbox/'
const API_SUBMIT_MESSAGE = 'https://1ieznu.deta.dev/user/inbox/make/'
const API_MARK_MESSAGE_READ = 'https://1ieznu.deta.dev/user/inbox/read/'

export type Message = {
  id: string
  type: string
  content: string
  created_date: number
  read: boolean
}
type QuizInfo = {
  id: string
  score: number
  ans: string[]
}

type ModuleInfo = {
  id: string
  quizzes: QuizInfo[]
  quests: string[]
  exp: number
  badges: string[]
}
export const defaultModuleInfo: ModuleInfo[] = [
  {
    id: 'kMvp8b48SmTiXXCl7EAkc',
    exp: 0,
    badges: ['ngtbhPgKtHLClT4WdXT9N'],
    quizzes: [],
    quests: [],
  },
]
export type User = {
  id: string
  modules: ModuleInfo[]
  profilePicUrl: string
  role: string
  userName: string
  displayName: string
  email: string
  created_date: number
  inbox: Message[]
}

export function levelize(exp: number): number {
  // if u have exp === 8 => level = 7 (position in the sequence)
  const fiboSeq = [
    0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946,
    17711, 28657, 46368, 75025, 121393, 196418, 317811,
  ]
  for (let i = 0; i < fiboSeq.length; i++) {
    if (exp >= fiboSeq[i]) {
      continue
    } else {
      return i
    }
  }
  return 0
}

export function expForNextLevel(exp: number): number {
  // if u have exp === 8 => level = 7 (position in the sequence)
  const fiboSeq = [
    0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946,
    17711, 28657, 46368, 75025, 121393, 196418, 317811,
  ]
  for (let i = 0; i < fiboSeq.length; i++) {
    if (exp >= fiboSeq[i]) {
      continue
    } else {
      return fiboSeq[i]
    }
  }
  return 1
}

export function useUser(): {
  user: User
  isLoading: boolean
  isError: any
} {
  const userId = useUserId()
  const { data, error } = useSWR(API_GET_USER + userId)
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useAllUser(): {
  users: User[]
  isLoading: boolean
  isError: any
} {
  const { data, error } = useSWR(API_GET_ALL_USER)
  return {
    users: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useUserById(userId: string) {
  const { data, error } = useSWR(API_GET_USER + userId)
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function submitToUserInbox(userId: string, message: Message): void {
  const requestBody = message
  fetch(API_SUBMIT_MESSAGE + userId, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
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
    mutate(API_GET_MESSAGES_BY_AUTHORID + userId)
  })
}

export function markMessageAsRead(userId: string, messageId: string): void {
  const requestBody = {
    id: messageId,
  }
  fetch(API_MARK_MESSAGE_READ + userId, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
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
    mutate(API_GET_MESSAGES_BY_AUTHORID + userId)
  })
}

export function useUserInbox(userId: string) {
  const { data, error } = useSWR(API_GET_MESSAGES_BY_AUTHORID + userId)
  return {
    inbox: data as Message[],
    isLoading: !error && !data,
    isError: error,
  }
}

export function updateUser(userId: string, newName: string): void {
  const requestBody = {
    displayName: newName,
  }
  fetch(API_UPDATE_USER + userId, {
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
    mutate(API_GET_USER + userId)
  })
}

export function updateModuleData(userId: string, modifiedModuleData: ModuleInfo[]): void {
  const requestBody = {
    modules: modifiedModuleData,
  }
  fetch(API_UPDATE_USER + userId, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
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
    mutate(API_GET_USER + userId)
  })
}

async function checkUserExists(userId: string): Promise<boolean> {
  const response = await fetch(API_CHECK_USER + userId, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  })
  const result = await response.json()
  return result['exist']
}

export async function getUser(userId: string) {
  const response = await fetch(API_GET_USER + userId, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  })
  const result = await response.json()
  return result
}

export async function makeUser(user): Promise<void> {
  const requestBody = {
    id: user['id'],
    modules: user['modules'],
    profilePicUrl: user['profilePicUrl'],
    role: user['role'],
    userName: user['userName'],
    displayName: user['displayName'],
    email: user['email'],
    created_date: getCurrentDateTime(),
    inbox: [
      {
        id: nanoid(),
        content: '<h2>Welcome!</h2><p>Wishing you a great learning journey ahead.</p>',
        created_date: getCurrentDateTime(),
        read: false,
      },
    ],
  }
  const exist = await checkUserExists(user['id'])
  if (exist) {
    console.log('user already in DB')
    return
  }
  if (!exist) {
    fetch(API_MAKE_USER, {
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
      addUserToModule('kMvp8b48SmTiXXCl7EAkc', user['id']) // add to CS2030 By default
    })
  } else {
    console.log('user already exists')
  }
}
