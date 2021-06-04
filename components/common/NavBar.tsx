import { useSession } from 'next-auth/client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { BsMoon, BsSun } from 'react-icons/bs'
import { RiDashboardLine } from 'react-icons/ri'
import Image from 'next/image'
import QuickLink from './QuickLink'
import { BiCaretDown } from 'react-icons/bi'

const NavBar = (): JSX.Element => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [session] = useSession()
  const [name, setName] = useState('')
  const [picture, setPicture] = useState(undefined)
  const [profileCollapse, setProfileCollapse] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
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

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
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
    <div className="sticky z-50 top-0 w-full shadow-md bg-white dark:bg-black h-16">
      <div className="flex h-full items-center justify-between">
        <div className="flex flex-row w-auto h-auto space-x-2 p-2">
          <Link href="/">
            <button className="px-3 bg-gray-600 hover:bg-blue-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
              <AiOutlineHome />
            </button>
          </Link>
          <Link href={session ? '/dashboard' : '/login'}>
            <button className="px-3 bg-gray-600 hover:bg-blue-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
              <RiDashboardLine />
            </button>
          </Link>
          <QuickLink />
          <button
            className="px-3 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-yellow-300 transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg border border-gray-300 shadow-md"
            onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? <BsMoon /> : <BsSun />}
          </button>
        </div>

        <div className="max-h-16 hidden md:flex items-center justify-center">
          <div className="transform scale-50 max-w-lg">
            <Image
              alt="NUSConnectBanner"
              src="/NUSConnectBanner.png"
              height={514}
              width={2343}
              className="cursor-pointer"
            />
          </div>
        </div>

        {!session && (
          <div className="p-1 flex items-center text-gray-800 dark:text-gray-200">
            <Link href="/login">
              <span className="flex px-2 font-light cursor-pointer border-r-2 border-gray-200 mr-2">
                Login
              </span>
            </Link>
            <Link href="/login">
              <span className="flex px-2 py-1 font-light cursor-pointer border border-indigo-300 rounded-lg hover:bg-indigo-200">
                Sign up
              </span>
            </Link>
          </div>
        )}
        {session && picture && (
          <div className="p-1 h-full w-auto flex mt-4 text-gray-800 dark:text-gray-200">
            <div
              className="flex flex-col h-full justify-items-end flex-shrink-0"
              onMouseEnter={() => setProfileCollapse(false)}
              onMouseLeave={() => setProfileCollapse(true)}>
              <div
                className="flex flex-row ml-2 items-center cursor-pointer space-x-2"
                onClick={() => setProfileCollapse(!profileCollapse)}>
                <Image
                  width={40}
                  height={40}
                  alt="profile"
                  src={picture}
                  className="object-cover rounded-full h-10 w-10"
                />
                <span className="hidden sm:flex font-light text-sm text-center whitespace-nowrap">
                  {name}
                </span>
                <BiCaretDown />
              </div>
              <div
                className={`w-auto rounded-md mt-2 shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 ${
                  profileCollapse ? 'invisible' : ''
                }`}>
                <div
                  className="py-2 text-md text-gray-700"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu">
                  <div className="block px-3 py-2 hover:bg-indigo-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600 cursor-pointer">
                    <Link href="/dashboard">Settings</Link>
                  </div>
                  <div className="block px-3 py-2 hover:bg-indigo-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600 cursor-pointer">
                    <Link href="/login">Logout</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NavBar
