import { useRouter } from 'next/router'
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
  const router = useRouter()
  return (
    <>
      <Auth>
        <div className="dark:bg-gray-800 w-full">
          <Layout>
            <div className="inline lg:flex">
                <div className={`${router.pathname === '/forum' ? "lg:max-w-sm xl:max-w-md mx-2": "hidden lg:flex lg:max-w-sm xl:max-w-md mx-2 flex-shrink-0"}`}>
                  <PostList postList={postList} />
                </div>
              <div className="mx-2 flex-grow">{children}</div>
            </div>
          </Layout>
        </div>
      </Auth>
    </>
  )
}
