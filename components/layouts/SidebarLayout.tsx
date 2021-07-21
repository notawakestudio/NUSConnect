import { useRouter } from 'next/router'
import React from 'react'
import NavigationDrawer from './NavigationDrawer'
import SideBar from './SideBar'

export default function SidebarLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const router = useRouter()
  if (router.pathname.startsWith('/forum')) {
    return (
      <div className="flex flex-row relative h-full">
        <div className="flex relative">
          <SideBar />
          <NavigationDrawer />
        </div>
        {children}
      </div>
    )
  } else {
    return (
      <div className="flex flex-row relative min-h-screen">
        <div className="flex relative">
          <SideBar />
          <NavigationDrawer />
        </div>
        {children}
      </div>
    )
  }
}
