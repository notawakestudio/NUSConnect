// import data from '../../public/data/ForumData.json'

export type Post = {
  title: string
  content: string
  date: string
  tags: string[]
  week: string
  isEdited: boolean
  author: string
  upVotes: number
}

// export const fetchPost = (): Post[] => {
//   return data.map((post : Post) => ({
//     ...title,
//   }))
// }
