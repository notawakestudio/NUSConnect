import { Button, Menu, MenuButton, MenuItem, MenuList, Skeleton } from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { AiFillCaretDown, AiOutlineCalendar } from 'react-icons/ai'
import { IoIosRemoveCircleOutline, IoMdAddCircleOutline } from 'react-icons/io'
import { MdDoneAll, MdNotifications, MdNotificationsActive } from 'react-icons/md'
import AnnouncementItem from '../../components/module/AnnouncementItem'
import { useModule } from '../../components/module/ModuleAPI'
import QuestItem from '../../components/module/QuestItem'
import { expForNextLevel, levelize, useUser, useUserInbox } from '../../components/profile/UserAPI'
import { useUserId } from '../../components/store/user'

export default function DashBoard(): JSX.Element {
  const { user, isLoading } = useUser()
  const userId = useUserId()
  const { inbox, isLoading: inboxLoading } = useUserInbox(userId)
  const router = useRouter()
  const { module, isLoading: moduleLoading } = useModule('kMvp8b48SmTiXXCl7EAkc')
  const [editing, setEditing] = useState(false)
  const [currentWeek, setCurrentWeek] = useState(null)

  const role = isLoading ? 'student' : user.role
  const weeks = moduleLoading
    ? [1]
    : Array.from(new Set(module.announcements.map((announcement) => announcement.week)))

  return (
    <>
      <Head>
        <title>Dashboard | NUS Connect</title>
        <meta name="description" content="NUS Connect" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="dark:bg-gray-800 relative overflow-hidden">
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
                        <div className="text-sm text-gray-700 dark:text-white ml-2 font-semibold border-b border-gray-200">
                          Level{' '}
                          {isLoading ? <Skeleton width={20} /> : levelize(user.modules[0].exp)}
                        </div>
                      </div>
                      <div className="border-b border-gray-200 mt-6 md:mt-0 text-black dark:text-white font-bold text-xl">
                        {isLoading ? <Skeleton width={20} /> : user.modules[0].exp}
                        <span className="text-xs text-gray-400"> EXP</span>
                      </div>
                    </div>
                    <div className="w-full h-3 bg-white">
                      <div
                        className="h-full text-center text-xs text-white bg-green-400"
                        style={{
                          width: isLoading
                            ? ''
                            : `${
                                (user.modules[0].exp / expForNextLevel(user.modules[0].exp)) * 100
                              }%`,
                        }}></div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="flex items-center w-full md:w-1/2 space-x-4">
                <div className="w-1/2 ">
                  <div className="shadow-lg px-4 py-6 w-full bg-white dark:bg-gray-700 relative">
                    <p className="text-2xl text-black dark:text-white font-bold">
                      {isLoading ? <Skeleton width={20} /> : user.modules[0].badges.length}
                    </p>

                    {isLoading ? (
                      <Skeleton width={20} />
                    ) : (
                      <p className="text-gray-400 text-sm">
                        {user.modules[0].badges.length > 1 ? 'Badges' : 'Badge'}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="shadow-lg px-4 py-6 w-full bg-white dark:bg-gray-700 relative">
                    <p className="text-2xl text-black dark:text-white font-bold">0</p>
                    <p className="text-gray-400 text-sm">Completed Quests</p>
                    <span className="rounded-full absolute p-4 bg-purple-500 top-2 right-4">
                      <MdDoneAll />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 ">
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<AiFillCaretDown />}
                  leftIcon={<AiOutlineCalendar size="25" />}
                  colorScheme={'purple'}>
                  {currentWeek ? `Week ${currentWeek}` : 'All Announcements'}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => setCurrentWeek(null)}>Show all</MenuItem>
                  {weeks.map((week) => (
                    <MenuItem key={week} onClick={() => setCurrentWeek(week)}>
                      Week {week}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
              <span className="text-sm text-gray-400">Jump to a different week</span>
            </div>
            <div className="flex flex-col pt-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4">
                <div className="flex flex-col lg:col-span-2">
                  <div className="flex flex-row justify-between items-center pb-2">
                    <span className="text-2xl font-semibold text-gray-800 dark:text-white">
                      Announcements
                    </span>
                    {role === 'admin' ? (
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
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="dark:text-gray-300">
                    {moduleLoading ? (
                      <Skeleton isLoaded={!isLoading} height={40} />
                    ) : (
                      module.announcements.map((announcement) =>
                        currentWeek === null ? (
                          <AnnouncementItem announcement={announcement} key={announcement.id} />
                        ) : announcement.week === currentWeek ? (
                          <AnnouncementItem announcement={announcement} key={announcement.id} />
                        ) : (
                          ''
                        )
                      )
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row justify-between items-center pb-2">
                    <span className="text-2xl font-semibold text-gray-800 dark:text-white">
                      Quests
                    </span>
                    {role === 'admin' ? (
                      <span className="flex flex-row space-x-1">
                        <button
                          onClick={() => setEditing(!editing)}
                          className="shadow-md p-2 cursor-pointer bg-white hover:bg-red-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
                          <span className="flex flex-row items-center">
                            <span className="items-center pt-1 pr-1">
                              <IoIosRemoveCircleOutline />
                            </span>
                            <span>edit</span>
                          </span>
                        </button>
                        <Link href={'/module/new-quest'}>
                          <span className="shadow-md p-2 cursor-pointer bg-white hover:bg-indigo-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-500 flex flex-row items-center">
                            <span className="items-center pt-1 pr-1">
                              <IoMdAddCircleOutline />
                            </span>
                            <span>new quest</span>
                          </span>
                        </Link>
                      </span>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="dark:text-gray-300">
                    {moduleLoading ? (
                      <Skeleton isLoaded={!isLoading} height={40} />
                    ) : (
                      module.quests.map((quest) => (
                        <QuestItem quest={quest} key={quest.id} editing={editing} />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
