import React from 'react'
import { useUser } from '../profile/UserAPI'

export default function SidebarHeader(): JSX.Element {
  const { user, isLoading } = useUser()

  return (
    <div className="flex items-center pl-6 h-20">
      <div className="ml-1">
        <span className="ml-1 text-md font-medium tracking-wide truncate dark:text-gray-100 font-sans">
          {isLoading ? '' : user.displayName}
        </span>
        <div className="badge">
          <span className="capitalize px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-800 bg-blue-100 rounded-full">
            {isLoading ? '' : user.role}
          </span>
        </div>
      </div>
    </div>
  )
}
