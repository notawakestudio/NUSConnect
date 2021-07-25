import { Menu, MenuButton, MenuItem, MenuList, Button } from '@chakra-ui/react'
import { useSession } from 'next-auth/client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { BiCaretDown } from 'react-icons/bi'
import { BsMoon, BsSun } from 'react-icons/bs'
import { RiDashboardLine } from 'react-icons/ri'
import Skeleton from 'react-loading-skeleton'
import { useUser } from '../profile/UserAPI'
import { useUserIdInit } from '../store/user'
import { useCurrentModule } from '../store/module'
import QuickLink from './QuickLink'
import { GoChevronDown } from 'react-icons/go'
import useLocalStorage from '../store/localStorage'
import { useRouter } from 'next/router'
const NavBar = (): JSX.Element => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [session] = useSession()
  const [profileCollapse, setProfileCollapse] = useState(true)
  const { state: module, dispatch } = useCurrentModule()
  const { user, isLoading } = useUser()
  const [storedValue, setValue] = useLocalStorage('module', {
    moduleTitle: 'CS2030',
    moduleId: 'kMvp8b48SmTiXXCl7EAkc',
  })
  const router = useRouter()
  useUserIdInit()
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
    <div
      className="flex sticky z-50 top-0 w-full shadow-md bg-white dark:bg-black h-16"
      aria-label="navbar">
      <div className="flex flex-row h-full items-center justify-center xs:items-start xs:justify-between flex-grow">
        <div className="flex flex-row h-full space-x-2 p-2 items-center">
          <Link href="/">
            <button className="px-3 bg-gray-600 hover:bg-blue-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg h-10">
              <AiOutlineHome />
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="px-3 bg-gray-600 hover:bg-blue-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg h-10">
              <RiDashboardLine />
            </button>
          </Link>
          <QuickLink />
          <button
            className="px-3 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-yellow-300 transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg border border-gray-300 shadow-md h-10"
            onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? <BsMoon /> : <BsSun />}
          </button>
        </div>
        <div className="h-16 hidden md:flex items-center w-auto">
          <div className="w-56">
            <Image
              alt="NUSConnectBanner"
              src="/NUSConnectBanner.png"
              height={514}
              width={2343}
              className="cursor-pointer"
            />
          </div>
        </div>

        {/* {!session && (
          <div className="hidden xs:flex py-4 px-2 items-center text-gray-800 dark:text-gray-200">
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
        )} */}
        <div className="hidden xs:flex py-3 px-1 h-full w-auto text-gray-800 dark:text-gray-200">
          <div className="hidden xs:flex py-4 px-2 items-center text-gray-800 dark:text-gray-200">
            <Link href="/login">
              <span className="flex px-2 font-light cursor-pointer border-gray-200 mr-2">
                {session ? '' : 'Login'}
              </span>
            </Link>
          </div>
          <div className="dark:text-black mr-2">
            <Menu>
              <MenuButton as={Button} rightIcon={<GoChevronDown />}>
                {module.moduleTitle}
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    if (module.moduleId === 'kMvp8b48SmTiXXCl7EAkc') {
                      return
                    }
                    setValue({ moduleTitle: 'CS2030', moduleId: 'kMvp8b48SmTiXXCl7EAkc' })
                    dispatch({
                      type: 'switch',
                      payload: { moduleTitle: 'CS2030', moduleId: 'kMvp8b48SmTiXXCl7EAkc' },
                    })
                    if (router.pathname.startsWith('/forum')) {
                      router.push('/forum')
                    }
                    if (router.pathname.startsWith('/quiz')) {
                      router.push('/quiz')
                    }
                  }}>
                  <span>CS2030</span>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    if (module.moduleId === 'RFfQyW-oenP9ZW5UQhTtd') {
                      return
                    }
                    setValue({ moduleTitle: 'CS2103T', moduleId: 'RFfQyW-oenP9ZW5UQhTtd' })
                    dispatch({
                      type: 'switch',
                      payload: { moduleTitle: 'CS2103T', moduleId: 'RFfQyW-oenP9ZW5UQhTtd' },
                    })
                    if (router.pathname.startsWith('/forum')) {
                      router.push('/forum')
                    }
                    if (router.pathname.startsWith('/quiz')) {
                      router.push('/quiz')
                    }
                  }}>
                  <span>CS2103T</span>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
          <div className="flex">
            <Menu autoSelect={false}>
              <MenuButton as="div" onMouseEnter={() => setProfileCollapse(false)}>
                <div className="flex flex-row items-center cursor-pointer space-x-2">
                  <Image
                    width={40}
                    height={40}
                    alt="profile"
                    src={isLoading ? '/white_profile-placeholder.png' : user.profilePicUrl}
                    className="object-cover rounded-full h-10 w-10"
                  />
                  <span className="hidden sm:flex font-light text-sm whitespace-nowrap">
                    {isLoading ? <Skeleton width={120} /> : user.displayName}
                  </span>
                  <span className="hidden sm:flex">
                    <BiCaretDown />
                  </span>
                </div>
              </MenuButton>
              <MenuList as="div" className={`${profileCollapse ? 'hidden' : ''}`}>
                <Link href="/profile">
                  <MenuItem>Profile</MenuItem>
                </Link>
                <Link href="/login">
                  <MenuItem>Logout</MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
