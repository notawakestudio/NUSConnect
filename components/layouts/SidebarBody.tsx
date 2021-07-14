import React from 'react'
import { BiBookReader } from 'react-icons/bi'
import { BsClipboardData } from 'react-icons/bs'
import { HiBadgeCheck } from 'react-icons/hi'
import { MdForum, MdViewModule } from 'react-icons/md'
import { useUserInbox } from '../profile/UserAPI'
import { useUserId } from '../store/user'
import SidebarItem from './SidebarItem'

export default function SidebarBody(): JSX.Element {
  const userId = useUserId()
  const { inbox, isLoading } = useUserInbox(userId)

  return (
    <div className="overflow-y-auto overflow-x-hidden flex-grow">
      <ul className="flex flex-col py-6 space-y-1">
        <li className="px-5">
          <div className="flex flex-row items-center h-8">
            <div className="flex font-semibold text-sm dark:text-gray-300 text-gray-400 my-4 font-sans uppercase">
              Community
            </div>
          </div>
        </li>
        <li>
          <SidebarItem link="/dashboard" name="Dashboard">
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
          </SidebarItem>
          <SidebarItem link="/quiz" name="Quiz">
            <BiBookReader size={20} />
          </SidebarItem>
          <SidebarItem link="/forum" name="Forum">
            <MdForum size={20} />
          </SidebarItem>
          <SidebarItem link="/module" name="Module">
            <MdViewModule size={20} />
          </SidebarItem>
        </li>
        <li className="px-5">
          <div className="flex flex-row items-center h-8">
            <div className="flex font-semibold text-sm dark:text-gray-300 text-gray-400 my-4 font-sans uppercase">
              personal
            </div>
          </div>
        </li>
        <li>
          <SidebarItem link="/profile" name="Profile">
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
          </SidebarItem>
          <SidebarItem
            link="/profile/inbox"
            name="Inbox"
            inbox={
              isLoading ? null : inbox.filter((message) => message.read === false).length > 0 ? (
                <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-500 bg-blue-100 rounded-full">
                  New
                </span>
              ) : null
            }>
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
          </SidebarItem>
          <SidebarItem link="/profile/badges" name="Badges">
            <HiBadgeCheck />
          </SidebarItem>
          <SidebarItem link="/scoreboard" name="Scoreboard">
            <BsClipboardData />
          </SidebarItem>
        </li>
        <li>
          <SidebarItem link="/login" name="Logout" style="red">
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
          </SidebarItem>
        </li>
      </ul>
    </div>
  )
}
