import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiFillCaretDown } from 'react-icons/ai'
import { GrFormCalendar, GrSemantics } from 'react-icons/gr'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { MdNotifications, MdNotificationsActive } from 'react-icons/md'
import Skeleton from 'react-loading-skeleton'
import SidebarLayout from '../../components/common/SidebarLayout'
import AnnouncementItem from '../../components/dashboard/AnnouncementItem'
import { fetchDashboardData } from '../../components/dashboard/DashboardAPI'
import QuestItem from '../../components/dashboard/QuestItem'
import { levelize, useUser, useUserInbox } from '../../components/profile/UserAPI'
import { useUserId } from '../../components/store/user'

export default function DashBoard(): JSX.Element {
  const schedule = fetchDashboardData('xft5nj9NXr_RXl3LEyt2g')
  const { user, isLoading } = useUser()
  const userId = useUserId()
  const { inbox, isLoading: inboxLoading } = useUserInbox(userId)
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Dashboard | NUS Connect</title>
        <meta name="description" content="NUS Connect" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="dark:bg-gray-800 relative overflow-hidden">
        <SidebarLayout>
          <div className="flex flex-col w-full md:space-y-4">
            <header className="w-full h-16 z-40 flex justify-end">
              <div className="relative z-20 flex flex-col justify-end h-full px-3 md:w-full">
                <div className="relative p-1 flex items-center w-full space-x-4 justify-end">
                  <button
                    className="flex p-2 mb-2 items-center rounded-full bg-white shadow text-gray-400 hover:text-gray-700 text-md"
                    onClick={() => {
                      router.push('/profile/inbox')
                    }}>
                    {inboxLoading ? (
                      <MdNotifications />
                    ) : inbox.filter((message) => message.read === false).length > 0 ? (
                      <MdNotificationsActive />
                    ) : (
                      <MdNotifications />
                    )}
                  </button>
                </div>
              </div>
            </header>
            <div className="px-4 md:px-6">
              <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
                Good day! {isLoading ? <Skeleton width={200} /> : user.displayName}
              </h1>
              <div className="flex my-6 items-center w-full space-y-4 md:space-x-4 md:space-y-0 flex-col md:flex-row">
                <div className="w-full md:w-6/12">
                  <div className="shadow-lg w-full bg-white dark:bg-gray-700 relative overflow-hidden">
                    <a href="#" className="w-full h-full block">
                      <div className="flex items-center justify-between px-4 py-6 space-x-4">
                        <div className="flex items-center">
                          <Image
                            layout="fixed"
                            width={40}
                            height={40}
                            alt="profile-pic"
                            objectFit="cover"
                            src={
                              isLoading ? '/white_profile-placeholder.png' : user.profilePicUrl
                            }></Image>
                          <p className="text-sm text-gray-700 dark:text-white ml-2 font-semibold border-b border-gray-200">
                            Level{' '}
                            {isLoading ? <Skeleton width={20} /> : levelize(user.modules[0].exp)}
                          </p>
                        </div>
                        <div className="border-b border-gray-200 mt-6 md:mt-0 text-black dark:text-white font-bold text-xl">
                          {user.modules[0].exp}
                          <span className="text-xs text-gray-400"> EXP</span>
                        </div>
                      </div>
                      <div className="w-full h-3 bg-white">
                        <div className="w-2/5 h-full text-center text-xs text-white bg-green-400"></div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="flex items-center w-full md:w-1/2 space-x-4">
                  <div className="w-1/2 ">
                    <div className="shadow-lg px-4 py-6 w-full bg-white dark:bg-gray-700 relative">
                      <p className="text-2xl text-black dark:text-white font-bold">12</p>
                      <p className="text-gray-400 text-sm">Badges</p>
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="shadow-lg px-4 py-6 w-full bg-white dark:bg-gray-700 relative">
                      <p className="text-2xl text-black dark:text-white font-bold">1st</p>
                      <p className="text-gray-400 text-sm">Rank</p>
                      <span className="rounded-full absolute p-4 bg-purple-500 top-2 right-4">
                        <GrSemantics />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-gray-400 text-md border-gray-300 border px-4 py-2 rounded-tl-sm rounded-bl-full rounded-r-full">
                  <GrFormCalendar size="30" className="mr-2 text-gray-400" />
                  Current Week
                  <AiFillCaretDown />
                </button>
                <span className="text-sm text-gray-400">Jump to a different week</span>
              </div>
              <div className="flex flex-col pt-4">
                {schedule.map((weekly) => {
                  return (
                    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4" key={weekly.id}>
                      <div className="flex flex-col md:col-span-2">
                        <div className="flex flex-row justify-between items-center pb-2">
                          <span className="text-2xl font-semibold text-gray-800 dark:text-white">
                            Announcements
                          </span>
                          <span>
                            <Link href={'/module/new-announcement'}>
                              <span className="shadow-md p-2 cursor-pointer bg-white hover:bg-indigo-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-500 flex flex-row items-center">
                                <span className="items-center pt-1 pr-1">
                                  <IoMdAddCircleOutline />
                                </span>
                                <span>new announcement</span>
                              </span>
                            </Link>
                          </span>
                        </div>
                        <div className="dark:text-gray-300">
                          {weekly.announcements.map((announcement) => (
                            <AnnouncementItem announcement={announcement} key={announcement.id} />
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-row justify-between items-center pb-2">
                          <span className="text-2xl font-semibold text-gray-800 dark:text-white">
                            Quests
                          </span>
                          <span>
                            <Link href={'/module/new-quest'}>
                              <span className="shadow-md p-2 cursor-pointer bg-white hover:bg-indigo-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-500 flex flex-row items-center">
                                <span className="items-center pt-1 pr-1">
                                  <IoMdAddCircleOutline />
                                </span>
                                <span>new quest</span>
                              </span>
                            </Link>
                          </span>
                        </div>
                        <div className="dark:text-gray-300">
                          {weekly.quests.map((quest) => (
                            <QuestItem quest={quest} key={quest.id} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </SidebarLayout>
      </main>
    </>
  )
}
