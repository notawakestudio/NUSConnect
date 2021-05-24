import Head from 'next/head'
import Footer from '../components/common/Footer'
import NavBar from '../components/common/NavBar'
import SideBarA from '../components/common/SideBarA'
import { fetchModuleData } from '../components/dashboard/ModuleAPI'
import { GiSwordman } from 'react-icons/gi'
import { GrSemantics } from 'react-icons/gr'
import Auth, { NameContext, useName } from '../components/common/Auth'
import { useContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'

export default function DashBoard(): JSX.Element {
  const schedule = fetchModuleData('xft5nj9NXr_RXl3LEyt2g')
  const [session, loading] = useSession()
  const [name, setName] = useState('user')
  const [picutre, setPicture] = useState()

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
      console.log(json) // name, email and image are the output.
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
                    <svg
                      width="20"
                      height="20"
                      className="text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
                    </svg>
                  </button>
                </div>
                <div className="relative z-20 flex flex-col justify-end h-full px-3 md:w-full">
                  <div className="relative p-1 flex items-center w-full space-x-4 justify-end">
                    <button className="flex p-2 items-center rounded-full bg-white shadow text-gray-400 hover:text-gray-700 text-md">
                      <svg
                        width="20"
                        height="20"
                        className="text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M912 1696q0-16-16-16-59 0-101.5-42.5t-42.5-101.5q0-16-16-16t-16 16q0 73 51.5 124.5t124.5 51.5q16 0 16-16zm816-288q0 52-38 90t-90 38h-448q0 106-75 181t-181 75-181-75-75-181h-448q-52 0-90-38t-38-90q50-42 91-88t85-119.5 74.5-158.5 50-206 19.5-260q0-152 117-282.5t307-158.5q-8-19-8-39 0-40 28-68t68-28 68 28 28 68q0 20-8 39 190 28 307 158.5t117 282.5q0 139 19.5 260t50 206 74.5 158.5 85 119.5 91 88z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </header>
              <div className="px-4 md:px-6">
                <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
                  Good afternoon {name}{' '}
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
                              src={picutre}></img>
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
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="mr-2 text-gray-400"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M192 1664h288v-288h-288v288zm352 0h320v-288h-320v288zm-352-352h288v-320h-288v320zm352 0h320v-320h-320v320zm-352-384h288v-288h-288v288zm736 736h320v-288h-320v288zm-384-736h320v-288h-320v288zm768 736h288v-288h-288v288zm-384-352h320v-320h-320v320zm-352-864v-288q0-13-9.5-22.5t-22.5-9.5h-64q-13 0-22.5 9.5t-9.5 22.5v288q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5zm736 864h288v-320h-288v320zm-384-384h320v-288h-320v288zm384 0h288v-288h-288v288zm32-480v-288q0-13-9.5-22.5t-22.5-9.5h-64q-13 0-22.5 9.5t-9.5 22.5v288q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5zm384-64v1280q0 52-38 90t-90 38h-1408q-52 0-90-38t-38-90v-1280q0-52 38-90t90-38h128v-96q0-66 47-113t113-47h64q66 0 113 47t47 113v96h384v-96q0-66 47-113t113-47h64q66 0 113 47t47 113v96h128q52 0 90 38t38 90z"></path>
                    </svg>
                    Current Week
                    <svg
                      width="20"
                      height="20"
                      className="ml-2 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z"></path>
                    </svg>
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
                          <div className="flex items-end space-x-2 my-6">
                            <p className="text-3xl text-black dark:text-white font-semibold">
                              Annoucement:{' '}
                            </p>
                            <span className="text-green-500 text-xl font-bold flex items-center">
                              22
                            </span>
                          </div>
                          <div className="dark:text-white">
                            {weekly['tasks'].map((task) => {
                              return (
                                <div
                                  key={task['id']}
                                  className="flex items-center pb-2 mb-2 text-sm sm:space-x-12  justify-between border-b border-gray-200">
                                  <p>{task['description']}</p>
                                  <div className="flex items-end text-xs">
                                    30
                                    <span className="flex items-center">
                                      <svg
                                        width="20"
                                        fill="currentColor"
                                        height="20"
                                        className="h-3 text-green-500"
                                        viewBox="0 0 1792 1792"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z"></path>
                                      </svg>
                                      exp
                                    </span>
                                  </div>
                                </div>
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
