import React, { useState } from 'react'
import NavigationDrawer from './NavigationDrawer'
import SideBar from './SideBar'

export default function SidebarLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const [open, setOpen] = useState(true)

  return (
    <div className="flex flex-row relative h-full">
      <div className="flex relative min-h-screen">
        <SideBar />
        <NavigationDrawer />
      </div>
      {children}
    </div>
  )
}
