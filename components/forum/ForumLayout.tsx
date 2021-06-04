import Auth from '../../components/common/Auth'
import Layout from '../../components/common/Layout'
import { Post } from './ForumAPI'
import PostList from './PostList'

export default function ForumLayout({
  children,
  postList,
  isIndex,
}: {
  children?: JSX.Element | JSX.Element[]
  postList: Post[]
  isIndex?: boolean
}): JSX.Element {
  return (
    <>
      <Auth>
        <div className="dark:bg-gray-800">
          <Layout>
            <div className="flex flex-row flex-nowrap mt-10">
              {isIndex && (
                <div className="lg:max-w-sm xl:max-w-md mx-2 flex-shrink-0">
                  <PostList postList={postList} />
                </div>
              )}
              {!isIndex && (
                <div className="hidden lg:flex lg:max-w-sm xl:max-w-md mx-2 flex-shrink-0">
                  <PostList postList={postList} />
                </div>
              )}
              <div className="mx-2 flex-grow">{children}</div>
            </div>
          </Layout>
        </div>
      </Auth>
    </>
  )
}
