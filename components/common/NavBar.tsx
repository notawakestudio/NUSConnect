import { useSession } from 'next-auth/client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { BsMoon, BsSun } from 'react-icons/bs'
import { RiDashboardLine } from 'react-icons/ri'
import Image from 'next/image'
import QuickLink from './QuickLink'

const NavBar = (): JSX.Element => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [session] = useSession()
  const [name, setName] = useState('')
  const [picture, setPicture] = useState(undefined)

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
    <header className="sticky z-50 top-0 w-full shadow-md bg-white dark:bg-black items-center h-16">
      <div className="flex flex-col justify-center h-full px-3 mx-auto flex-center">
        <div className="items-center justify-between pl-1 flex h-full w-full lg:max-w-68 sm:pr-2 sm:ml-0">
          <div className="container left-60 flex w-auto h-auto">
            <div className="flex w-full h-10 ">
              <div className="hidden sm:flex px-2 text-center justify-center">
                <Image
                  alt="NUSConnectBanner"
                  src="/NUSConnectBanner.png"
                  height={50}
                  width={180}
                  className="mx-auto cursor-pointer"
                />
              </div>
              <Link href="/">
                <button className="px-4 bg-gray-600 hover:bg-blue-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
                  <AiOutlineHome />
                </button>
              </Link>
              <Link href={session ? '/dashboard' : '/login'}>
                <button className="ml-1 px-4 bg-gray-600 hover:bg-blue-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
                  <RiDashboardLine />
                </button>
              </Link>
              <QuickLink />
              <button
                className="py-2 px-4 text-2xl flex justify-center items-center  hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-yellow-300 transition ease-in duration-200 text-center font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? <BsMoon /> : <BsSun />}
              </button>
            </div>
          </div>

          {!session && (
            <div className="p-1 flex items-center">
              <Link href="/login">
                <span className="flex p-5 font-bold cursor-pointer">Login</span>
              </Link>
              <Image
                width={40}
                height={40}
                alt="profile"
                src="/cat.jpg"
                className="mx-auto object-cover rounded-full h-10 w-10 cursor-pointer"
              />
            </div>
          )}
          {session && picture && (
            <div className="p-1 flex items-center">
              <Link href="/login">
                <span className="flex p-5 font-bold cursor-pointer border-r">Logout</span>
              </Link>
              <Link href="/dashboard">
                <span className="flex p-5 font-bold cursor-pointer">{name}</span>
              </Link>
              <Image
                width={40}
                height={40}
                alt="profile"
                src={picture}
                className="mx-auto object-cover rounded-full h-10 w-10 "
              />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default NavBar
