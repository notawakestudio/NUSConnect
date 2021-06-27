import useSWR, { mutate } from 'swr'
import { getCurrentDateTime } from '../common/Util'
import { useUserId } from '../store/user'

const API_MAKE_USER = 'https://1ieznu.deta.dev/user/make'
const API_GET_USER = 'https://1ieznu.deta.dev/user/'
const API_CHECK_USER = 'https://1ieznu.deta.dev/user/check/'
const API_UPDATE_USER = 'https://1ieznu.deta.dev/user/update/'
// type User = {
//   id: string
//   modules: string[]
//   profilePicUrl: string
//   role: string
//   userName: string
//   displayName: string
//   email: string
//   created_date: number
// }

export function useUser() {
  const userId = useUserId()
  const { data, error } = useSWR(API_GET_USER + userId)
  return {
    user: data,
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
    })
  } else {
    console.log('user already exists')
  }
}
