import { nanoid } from 'nanoid'
import useSWR, { mutate } from 'swr'
import ModuleData from '../../public/data/ModuleData.json'
import { getCurrentDateTime } from '../common/Util'
import { Post, Reply } from '../forum/ForumAPI'
import { Question, Quiz } from '../quiz/types'
const API_MAKE_MODULE = 'https://1ieznu.deta.dev/module/make'
const API_GET_ALL_MODULE = 'https://1ieznu.deta.dev/module'
const API_GET_MODULE = 'https://1ieznu.deta.dev/module/'
const API_SUBMIT_ANNOUNCEMENT = 'https://1ieznu.deta.dev/module/announcement/make/'
const API_DELETE_ANNOUNCEMENT = 'https://1ieznu.deta.dev/module/announcement/delete/'
const API_UPDATE_ANNOUNCEMENT = 'https://1ieznu.deta.dev/module/announcement/update/'
export type Reward = {
  exp: number
  badge: string
}

export type Quest = {
  id: string
  week: number
  description: string
  type: string
  count: number
  link: string
  created_date: number
  end_date: number
  reward: Reward
}

export type Announcement = {
  id: string
  week: number
  author_id: string
  title: string
  content: string
  created_date: number
}

export type Module = {
  id: string
  title: string
  users: string[]
  questions: Question[]
  quizzes: Quiz[]
  posts: Post[]
  replies: Reply[]
  announcements: Announcement[]
  quests: Quest[]
}

const fetcher = (URL: string) => fetch(URL).then((res) => res.json())

export const useAllModules = (): {
  modules: Module[]
  isLoading: boolean
} => {
  const { data, error } = useSWR(API_GET_ALL_MODULE, fetcher)
  return {
    modules: data,
    isLoading: !error && !data,
  }
}

export const useModule = (
  moduleId: string
): {
  module: Module
  isLoading: boolean
} => {
  const { data, error } = useSWR(API_GET_MODULE + moduleId, fetcher)
  return {
    module: data,
    isLoading: !error && !data,
  }
}

export function makeModule(module: Module): void {
  const requestBody: Module = {
    id: module['id'],
    title: module['title'],
    users: module['users'],
    quizzes: module['quizzes'],
    questions: module['questions'],
    posts: module['posts'],
    replies: module['replies'],
    announcements: module['announcements'],
    quests: module['quests'],
  }
  fetch(API_MAKE_MODULE, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(requestBody), // body data type must match "Content-Type" header
  }).then((response) => {
    console.log(response)
  })
}

export const fetchModuleTitle = (moduleId: string): string => {
  return ModuleData.filter((module) => module['id'] === moduleId)[0]['title']
}

export function makeAnnouncement(moduleId: string, announcement: Announcement): void {
  const requestBody: Announcement = {
    id: nanoid(),
    week: announcement['week'],
    author_id: announcement['author_id'],
    title: announcement['title'],
    content: announcement['content'],
    created_date: getCurrentDateTime(),
  }
  fetch(API_SUBMIT_ANNOUNCEMENT + moduleId, {
    method: 'POST',
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

export function updateAnnouncement(
  update: string[],
  moduleId: string,
  currAnnouncement: Announcement
): void {
  currAnnouncement.title = update['title']
  currAnnouncement.week = update['week']
  currAnnouncement.content = update['content']
  const requestBody = currAnnouncement

  fetch(API_UPDATE_ANNOUNCEMENT + moduleId + '/' + currAnnouncement.id, {
    method: 'POST',
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
    mutate(API_GET_MODULE + moduleId)
  })
}

export function deleteAnnouncement(moduleId: string, announcementId: string): void {
  const requestBody = {}
  fetch(API_DELETE_ANNOUNCEMENT + moduleId + '/' + announcementId, {
    method: 'DELETE', // *GET, Announcement, PUT, DELETE, etc.
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
    mutate(API_GET_MODULE + moduleId)
  })
}

export function makeQuest(quest: string[]): void {
  const currDate = getCurrentDateTime()

  const requestBody: Quest = {
    id: nanoid(),
    week: 1,
    description: quest['description'],
    type: quest['type'],
    count: quest['content'],
    link: quest['link'],
    created_date: currDate,
    end_date: quest['endDate'],
    reward: quest['reward'],
  }

  console.log('created Quest')
  // fetch(API_SUBMIT_QUEST, {
  //   method: 'Quest', // *GET, Quest, PUT, DELETE, etc.
  //   mode: 'no-cors', // no-cors, *cors, same-origin
  //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //   credentials: 'same-origin', // include, *same-origin, omit
  //   headers: {
  //     'Content-Type': 'application/json',
  //     // 'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   redirect: 'follow', // manual, *follow, error
  //   referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //   body: JSON.stringify(requestBody), // body data type must match "Content-Type" header
  // }).then((response) => {
  //   console.log(response)
  //   // trigger a revalidation (refetch) to make sure our local data is correct
  //   mutate(API_GET_ALL_QUESTS)
  // })
}

export function updateQuest(update: string[], currQuest: Quest): void {
  const requestBody = {
    description: update['description'],
    type: update['type'],
    count: update['count'],
    reward: update['reward'],
  }

  if (update['description'] === currQuest.description) {
    delete requestBody['description']
  }
  if (update['type'] === currQuest.type) {
    delete requestBody['type']
  }
  if (update['count'] === currQuest.count) {
    delete requestBody['count']
  }
  if (update['reward'] === currQuest.reward) {
    delete requestBody['reward']
  }

  // console.log('updated Quest')
  // fetch(API_UPDATE_QUEST + currQuest.id, {
  //   method: 'Quest', // *GET, Quest, PUT, DELETE, etc.
  //   mode: 'no-cors', // no-cors, *cors, same-origin
  //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //   credentials: 'same-origin', // include, *same-origin, omit
  //   headers: {
  //     'Content-Type': 'application/json',
  //     // 'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   redirect: 'follow', // manual, *follow, error
  //   referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //   body: JSON.stringify(requestBody), // body data type must match "Content-Type" header
  // }).then((response) => {
  //   console.log(response)
  //   mutate(API_GET_QUEST_BY_ID + currQuest.id)
  // })
}

export function deleteQuest(questId: string): void {
  console.log('delete Quest')
  const requestBody = {}
  // fetch(API_UPDATE_QUEST + questId, {
  //   method: 'DELETE', // *GET, Quest, PUT, DELETE, etc.
  //   mode: 'cors', // no-cors, *cors, same-origin
  //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //   credentials: 'same-origin', // include, *same-origin, omit
  //   headers: {
  //     'Content-Type': 'application/json',
  //     // 'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   redirect: 'follow', // manual, *follow, error
  //   referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //   body: JSON.stringify(requestBody), // body data type must match "Content-Type" header
  // }).then((response) => {
  //   console.log(response)
  //   // trigger a revalidation (refetch) to make sure our local data is correct
  //   mutate(API_GET_ALL_QUESTS)
  // })
}
