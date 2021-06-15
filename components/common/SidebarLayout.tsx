import React from 'react'
import NavigationDrawer from './NavigationDrawer'
import SideBar from './SideBar'

export default function SidebarLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="flex flex-row">
      <div className="flex flex-auto relative">
        <SideBar />
        <NavigationDrawer />
      </div>
      {children}
    </div>
  )
}
