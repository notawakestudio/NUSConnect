import Link from 'next/link'
import React from 'react'
import { BiBookReader } from 'react-icons/bi'
import { BsClipboardData } from 'react-icons/bs'
import { HiBadgeCheck } from 'react-icons/hi'
import { MdForum } from 'react-icons/md'
import { useUserInbox } from '../profile/UserAPI'
import { useUserId } from '../store/user'

export default function SidebarBody(): JSX.Element {
  const userId = useUserId()
  const { inbox, isLoading } = useUserInbox(userId)

  return (
    <div className="overflow-y-auto overflow-x-hidden flex-grow">
      <ul className="flex flex-col py-6 space-y-1">
        <li className="px-5">
          <div className="flex flex-row items-center h-8">
            <div className="flex font-semibold text-sm dark:text-gray-300 text-gray-400 my-4 font-sans uppercase">
              Dashboard
            </div>
          </div>
        </li>
        <li>
          <Link href="/dashboard">
            <div className="cursor-pointer relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
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
            <div className="cursor-pointer relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
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
            <div className="cursor-pointer relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
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
          <Link href="/profile/inbox">
            <div className="cursor-pointer relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
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
              {isLoading ? null : inbox.filter((message) => message.read === false).length > 0 ? (
                <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-500 bg-blue-100 rounded-full">
                  New
                </span>
              ) : null}
            </div>
          </Link>
        </li>
        <li className="px-5">
          <div className="flex flex-row items-center h-8">
            <div className="flex font-semibold text-sm dark:text-gray-300 text-gray-400 my-4 font-sans uppercase">
              Settings
            </div>
          </div>
        </li>
        <li>
          <Link href="/profile">
            <div className="cursor-pointer relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
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
            <div className="cursor-pointer relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
              <span className="inline-flex justify-center items-center ml-4">
                <HiBadgeCheck />
              </span>
              <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
                Badges
              </span>
            </div>
          </Link>
          <Link href="/scoreboard">
            <div className="cursor-pointer relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
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
  )
}
