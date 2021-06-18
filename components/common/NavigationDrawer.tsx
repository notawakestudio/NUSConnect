import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { BiBookReader } from 'react-icons/bi'
import { MdForum } from 'react-icons/md'
import { AiOutlineMenu } from 'react-icons/ai'
import { HiBadgeCheck } from 'react-icons/hi'
import { BsClipboardData } from 'react-icons/bs'

export default function NavigationDrawer(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <div className="flex md:hidden z-50">
        <div className="fixed top-20 left-4">
          <button
            className="rounded-full bg-blue-400 p-2 h-8 w-8 content-center justify-center text-white "
            onClick={onOpen}>
            <AiOutlineMenu className="w-4 h-4 " />
          </button>
        </div>
        <Drawer placement={'left'} onClose={onClose} isOpen={isOpen} size={'xs'}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">
              <div className="flex items-center pl-6 h-20">
                <div className="ml-1">
                  <p className="ml-1 text-md font-medium tracking-wide truncate dark:text-gray-100 font-sans">
                    Student
                  </p>
                  <div className="badge">
                    <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-800 bg-blue-100 rounded-full">
                      Admin
                    </span>
                  </div>
                </div>
              </div>
            </DrawerHeader>
            <DrawerBody>
              <div className="overflow-y-auto overflow-x-hidden flex-grow">
                <ul className="flex flex-col py-6 space-y-1">
                  <li className="px-5">
                    <div className="flex flex-row items-center h-8">
                      <div className="flex font-semibold text-sm text-gray-300 my-4 font-sans uppercase">
                        Dashboard
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link href="/dashboard">
                      <div className="cursor-pointer relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
                        <span className="inline-flex justify-center items-center ml-4">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                          </svg>
                        </span>
                        <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
                          Home
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/quiz">
                      <div className="cursor-pointer relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
                        <span className="inline-flex justify-center items-center ml-4">
                          <BiBookReader size={20} />
                        </span>
                        <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
                          Quiz
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/forum">
                      <div className="cursor-pointer relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
                        <span className="inline-flex justify-center items-center ml-4">
                          <MdForum size={20} />
                        </span>
                        <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
                          Forum
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <div className="cursor-pointer relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
                        <span className="inline-flex justify-center items-center ml-4">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                          </svg>
                        </span>
                        <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
                          Inbox
                        </span>
                        <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-500 bg-blue-100 rounded-full">
                          New
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="px-5">
                    <div className="flex flex-row items-center h-8">
                      <div className="flex font-semibold text-sm text-gray-300 my-4 font-sans uppercase">
                        Settings
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link href="/profile">
                      <div className="cursor-pointer relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
                        <span className="inline-flex justify-center items-center ml-4">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                        </span>
                        <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
                          Profile
                        </span>
                      </div>
                    </Link>
                    <Link href="/profile/badges">
                      <div className="cursor-pointer relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
                        <span className="inline-flex justify-center items-center ml-4">
                          <HiBadgeCheck />
                        </span>
                        <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
                          Badges
                        </span>
                      </div>
                    </Link>
                    <Link href="/scoreboard">
                      <div className="cursor-pointer relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
                        <span className="inline-flex justify-center items-center ml-4">
                          <BsClipboardData />
                        </span>
                        <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
                          Scoreboard
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/login">
                      <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-red-500 pr-6 cursor-pointer">
                        <span className="inline-flex justify-center items-center ml-4 text-red-400">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                          </svg>
                        </span>
                        <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
                          Logout
                        </span>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  )
}
