import { useSession } from 'next-auth/client'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AiFillCaretDown, AiOutlineArrowUp } from 'react-icons/ai'
import { GrFormCalendar, GrNotification, GrSemantics } from 'react-icons/gr'
import { FcMenu } from 'react-icons/fc'
import Auth from '../components/common/Auth'
import Footer from '../components/common/Footer'
import NavBar from '../components/common/NavBar'
import SideBarA from '../components/common/SideBarA'
import { fetchModuleData } from '../components/dashboard/ModuleAPI'

export default function DashBoard(): JSX.Element {
  const schedule = fetchModuleData('xft5nj9NXr_RXl3LEyt2g')
  const [session] = useSession()
  const [name, setName] = useState('user')
  const [picture, setPicture] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/userData')
      const json = await res.json()
      if (json.name) {
        setName(json.name)
      }
      if (json.image) {
        setPicture(json.image)
      }
    }
    fetchData()
  }, [session])

  return (
    <>
      <Head>
        <title>Dashboard | NUS Connect</title>
        <meta name="description" content="NUS Connect" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Auth>
        <NavBar />
        <main className="bg-gray-100 dark:bg-gray-800 relative h-screen overflow-hidden">
          <div className="flex items-start justify-between">
            <SideBarA />
            <div className="flex flex-col w-full md:space-y-4">
              <header className="w-full h-16 z-40 flex items-center justify-between">
                <div className="block lg:hidden ml-6">
                  <button className="flex p-2 items-center rounded-full bg-white shadow text-gray-500 text-md">
                    <FcMenu />
                  </button>
                </div>
                <div className="relative z-20 flex flex-col justify-end h-full px-3 md:w-full">
                  <div className="relative p-1 flex items-center w-full space-x-4 justify-end">
                    <button className="flex p-2 items-center rounded-full bg-white shadow text-gray-400 hover:text-gray-700 text-md">
                      <GrNotification />
                    </button>
                  </div>
                </div>
              </header>
              <div className="px-4 md:px-6">
                <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
                  Good day! {name}{' '}
                </h1>
                <div className="flex my-6 items-center w-full space-y-4 md:space-x-4 md:space-y-0 flex-col md:flex-row">
                  <div className="w-full md:w-6/12">
                    <div className="shadow-lg w-full bg-white dark:bg-gray-700 relative overflow-hidden">
                      <a href="#" className="w-full h-full block">
                        <div className="flex items-center justify-between px-4 py-6 space-x-4">
                          <div className="flex items-center">
                            <img
                              className=" rounded-full relative w-10 h-10"
                              alt="profile-pic"
                              src={picture}></img>
                            <p className="text-sm text-gray-700 dark:text-white ml-2 font-semibold border-b border-gray-200">
                              Level 2
                            </p>
                          </div>
                          <div className="border-b border-gray-200 mt-6 md:mt-0 text-black dark:text-white font-bold text-xl">
                            100
                            <span className="text-xs text-gray-400"> EXP</span>
                          </div>
                        </div>
                        <div className="w-full h-3 bg-gray-100">
                          <div className="w-2/5 h-full text-center text-xs text-white bg-green-400"></div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center w-full md:w-1/2 space-x-4">
                    <div className="w-1/2">
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
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 my-4">
                  {schedule.map((weekly) => {
                    return (
                      <div className="w-full" key={weekly['id']}>
                        <div className="shadow-lg px-4 py-6 w-full bg-white dark:bg-gray-700 relative">
                          <p className="text-sm w-max text-gray-700 dark:text-white font-semibold border-b border-gray-200">
                            Week {weekly['week']}
                          </p>
                          <div className="flex-col items-end space-x-2 my-6">
                            <p className="text-xl text-black dark:text-white font-semibold">
                              Annoucement:
                              <br />
                            </p>
                            <span className="text-green-500 text-xl font-bold flex items-center">
                              {weekly['announcement']}
                            </span>
                          </div>
                          <div className="dark:text-white">
                            {weekly['tasks'].map((task) => {
                              return (
                                <Link href={task['link']} key={task['id']}>
                                  <div className="flex items-center pb-2 mb-2 text-sm sm:space-x-12 cursor-pointer justify-between border-b border-gray-200">
                                    <p>{task['description']}</p>
                                    <div className="flex items-end text-xs">
                                      {task['exp']}
                                      <span className="flex items-center">
                                        <AiOutlineArrowUp className="h-3 text-green-500" />
                                        exp
                                      </span>
                                    </div>
                                  </div>
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </Auth>
    </>
  )
}
