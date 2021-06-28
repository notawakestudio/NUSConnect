import { nanoid } from 'nanoid'
import { mutate } from 'swr'
import ModuleDataNew from '../../public/data/ModuleDataNew.json'
import { getCurrentDateTime, getCurrentWeek } from '../common/Util'
import { Announcement, API_GET_ALL_Announcement } from '../forum/ForumAPI'

export type Reward = {
  exp: number
  badge: string
}

export type Quest = {
  id: string
  description: string
  type: string
  count: number
  link: string
  reward: Reward
}

export type Announcement = {
  id: string
  author_id: string
  title: string
  content: string
  created_date: number
}

export type WeeklySchedule = {
  id: string
  week: string
  announcements: Announcement[]
  quests: Quest[]
}

export const fetchDashboardData = (moduleId: string): WeeklySchedule[] => {
  return ModuleDataNew.filter((module) => module['id'] === moduleId)[0]['schedule']
}

export const fetchModuleTitle = (moduleId: string): string => {
  return ModuleDataNew.filter((module) => module['id'] === moduleId)[0]['title']
}

export function makeAnnouncement(announcement: string[]): void {
  const currDate = getCurrentDateTime()

  const requestBody: Announcement = {
    id: nanoid(),
    author_id: announcement['author'],
    title: announcement['title'],
    content: announcement['content'],
    created_date: currDate,
  }

  console.log(requestBody)
  // fetch(API_SUBMIT_ANNOUNCEMENT, {
  //   method: 'Announcement', // *GET, Announcement, PUT, DELETE, etc.
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
  //   mutate(API_GET_ALL_ANNOUNCEMENTS)
  // })
}

export function updateAnnouncement(update: string[], currAnnouncement: Announcement): void {
  const requestBody = {
    title: update['title'],
    content: update['content'],
  }

  if (update['title'] === currAnnouncement.title) {
    delete requestBody['title']
  }
  if (update['content'] === currAnnouncement.content) {
    delete requestBody['content']
  }

  // fetch(API_UPDATE_ANNOUNCEMENTS + currAnnouncement.id, {
  //   method: 'Announcement', // *GET, Announcement, PUT, DELETE, etc.
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
  //   mutate(API_GET_ANNOUNCEMENT_BY_ID + currAnnouncement.id)
  // })
}
