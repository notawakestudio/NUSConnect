import Auth from '../../components/common/Auth'
import Layout from '../../components/common/Layout'
import { Post } from './ForumAPI'
import PostList from './PostList'

export default function ForumLayout({
  children,
  postList,
}: {
  children?: JSX.Element | JSX.Element[]
  postList: Post[]
}): JSX.Element {
  return (
    <>
      <Auth>
        <Layout>
          <div className="flex flex-row flex-nowrap mt-10">
            <div className="max-w-md min-w-md flex-shrink-0">
              <PostList postList={postList} />
            </div>
            {children}
          </div>
        </Layout>
      </Auth>
    </>
  )
}
