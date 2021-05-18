import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsSun, BsMoon } from 'react-icons/bs'
import { AiOutlineHome } from 'react-icons/ai'
import { RiDashboardLine } from 'react-icons/ri'

import QuickLink from './QuickLink'
const NavBar = (): JSX.Element => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true)
    } else {
      setIsDarkMode(false)
    }
  }, [])
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
    }
  }, [isDarkMode])
  return (
    <header className="sticky z-50 top-0 w-full shadow-md bg-white dark:bg-black items-center h-16">
      <div className="flex flex-col justify-center h-full px-3 mx-auto flex-center">
        <div className="items-center pl-1 flex h-full w-full lg:max-w-68 sm:pr-2 sm:ml-0">
          <div className="container left-60 flex w-auto h-auto">
            <div className="flex w-full h-10">
              <Link href="/">
                <button className="px-4 bg-gray-600 hover:bg-blue-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
                  <AiOutlineHome />
                </button>
              </Link>
              <Link href="/dashboard">
                <button className="ml-1 px-4 bg-gray-600 hover:bg-blue-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
                  <RiDashboardLine />
                </button>
              </Link>
              <QuickLink />
              <button
                className="py-2 px-4 text-2xl flex justify-center items-center  hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-yellow-300 transition ease-in duration-200 text-center font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode ? <BsMoon /> : <BsSun />}
              </button>
            </div>
          </div>
          <div className="inline-flex h-full w-2 py-2  text-center">
            <a href="#" className="inline-flex text-center px-72">
              <Link href="/">
                <img alt="NUSConnectBanner" src="./NUSConnectBanner.png" className="mx-auto h-auto w-auto" />
              </Link>
            </a>
          </div>
          {/* <Link href="/">
            <a href="#" className="inline-flex h-full w-full py-2 text-center ">
              <img alt="NUSConnectBanner" src="./NUSConnectBanner.png" className="mx-auto" />
            </a>
          </Link> */}
          <div className="p-1 flex items-center justify-end w-1/4 ml-5 mr-4 sm:mr-0 sm:right-auto">
            <a href="#" className="block ">
              <img alt="profile" src="https://timesofindia.indiatimes.com/photo/67586673.cms" className="mx-auto object-cover rounded-full h-10 w-10 " />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavBar
