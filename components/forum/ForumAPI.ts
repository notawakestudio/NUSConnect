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

export const getAllPosts = () => {
  return data
}

export const getPostById = (id: string) => {
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
