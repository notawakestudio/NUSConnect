import Layout from '../components/common/Layout'
import Head from 'next/head'
import { useSession } from 'next-auth/client'
import { useEffect, useState } from 'react'
export default function Profile(): JSX.Element {
  const [session] = useSession()
  const [name, setName] = useState('user')
  const [imageUrl, setImageUrl] = useState("/cat.jpg")
  useEffect(() => {
    if (session) {
      setName(session.user.name)
      setImageUrl(session.user.image)
    }
  },[session])
  return (
    <Layout>
      <Head>
        <title>Profile | NUS Connect</title>
        <meta name="description" content="NUS Connect" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-center text-xl py-4">Profile</h1>
      <div className="shadow-lg mx-auto rounded-2xl w-80 p-4 bg-white dark:bg-gray-800">
        <div className="flex flex-row items-start gap-4">
          <img src={imageUrl} className="w-28 h-28 rounded-lg" />
          <div className="h-28 w-full flex flex-col justify-between">
            <div>
              <p className="text-gray-800 dark:text-white text-xl font-medium">{name}</p>
              <p className="text-gray-400 text-xs">Admin</p>
            </div>
            <div className="rounded-lg bg-blue-100 dark:bg-white p-2 w-full">
              <div className="flex items-center justify-between text-xs text-gray-400 dark:text-black">
                <p className="flex flex-col">
                  Posts
                  <span className="text-black dark:text-indigo-500 font-bold">2</span>
                </p>
                <p className="flex flex-col">
                  Replies
                  <span className="text-black dark:text-indigo-500 font-bold">5</span>
                </p>
                <p className="flex flex-col">
                  Quizzes
                  <span className="text-black dark:text-indigo-500 font-bold">9</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
