import data from '../../public/data/ForumData.json'

// export type Post = {
//   id: string
//   title: string
//   content: string
//   date: string
//   tags: string[]
//   week: string
//   isEdited: boolean
//   author: string
//   upVotes: string
// }

// export const fetchPost = (): Post[] => {
//   return data.map(Post);
// }

export const getPostData = (postId) => {
  // console.log(postId)
  return data.filter((post) => post['id'] === postId)[0]
}
