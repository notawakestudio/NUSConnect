import Head from 'next/head'
import React from 'react'
import SidebarLayout from '../../components/layouts/SidebarLayout'
import NewAnnouncement from '../../components/module/NewAnnouncement'

export default function CreateAnnouncement(): JSX.Element {
  return (
    <>
      <Head>
        <title>New Announcement | NUS Connect</title>
        <meta name="description" content="Announcement" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex-grow flex-col dark:bg-gray-800 dark:text-gray-200">
        <SidebarLayout>
          <NewAnnouncement />
        </SidebarLayout>
      </div>
    </>
  )
}
