import Link from 'next/link'
import React from 'react'

export default function SidebarItem({
  children,
  link,
  name,
  style = 'blue',
  inbox = null,
}: {
  children: JSX.Element
  link: string
  name: string
  style?: string
  message?: JSX.Element
  inbox?: JSX.Element
}): JSX.Element {
  if (style === 'blue') {
    return (
      <Link href={link}>
        <div className="cursor-pointer relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
          <span className="inline-flex justify-center items-center ml-4">{children}</span>
          <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
            {name}
          </span>
          {inbox}
        </div>
      </Link>
    )
  } else if (style === 'red') {
    return (
      <Link href={link}>
        <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-red-500 pr-6 cursor-pointer">
          <span className="inline-flex justify-center items-center ml-4 text-red-400">
            {children}
          </span>
          <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
            {name}
          </span>
        </div>
      </Link>
    )
  }
}
