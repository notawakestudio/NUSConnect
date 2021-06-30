import SidebarLayout from '../components/common/SidebarLayout'
import Head from 'next/head'
import { useAllUser } from '../components/profile/UserAPI'
import { Skeleton } from '@chakra-ui/react'
function Scoreboard(): JSX.Element {
  const { users, isLoading } = useAllUser()
  return (
    <SidebarLayout>
      <div className="container flex flex-col">
        <Head>
          <title>Scoreboard | NUS Connect</title>
          <meta name="description" content="NUS Connect" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="mt-4 px-4 py-5 sm:px-6 mx-auto border dark:bg-gray-800 bg-white shadow mb-2 rounded-md">
          <h3 className="text-lg text-center leading-6 font-medium text-gray-900 dark:text-white">
            ScoreBoard
          </h3>
          <p className="mt-1 text-center text-sm text-gray-500 dark:text-gray-200">
            Healthy Competition = Extrinsic Motivation
          </p>
        </div>
        <ul className="flex flex-col self-center">
          {isLoading ? (
            <Skeleton height="600" />
          ) : (
            users
              .sort((a, b) => b.modules[0].exp - a.modules[0].exp)
              .map((user) => {
                return (
                  <li className="border-gray-400 flex flex-row mb-2" key={user.id}>
                    <div className="transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
                      <div className="flex flex-col w-10 h-10 justify-center items-center mr-4">
                        <img
                          alt="profile"
                          src={user.profilePicUrl}
                          className="mx-auto object-cover rounded-full h-10 w-10 "
                        />
                      </div>
                      <div className="flex-1 pl-1 md:mr-16">
                        <div className="font-medium dark:text-white">{user.displayName}</div>
                      </div>
                      <div className="text-gray-600 dark:text-gray-200 text-xs">
                        EXP: {user.modules[0].exp}
                      </div>
                    </div>
                  </li>
                )
              })
          )}
        </ul>
      </div>
    </SidebarLayout>
  )
}

export default Scoreboard
