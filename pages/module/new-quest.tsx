import Head from 'next/head'
import React from 'react'
import SidebarLayout from '../../components/layouts/SidebarLayout'
import NewQuest from '../../components/module/NewQuest'

export default function CreateAnnouncement(): JSX.Element {
  return (
    <>
      <Head>
        <title>New Quest | NUS Connect</title>
        <meta name="description" content="Announcement" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex-grow flex-col dark:bg-gray-800 dark:text-gray-200">
        <SidebarLayout>
          <div className="p-4 pt-10 dark:bg-gray-800 dark:text-gray-200 w-full">
            <div className="shadow-lg">
              <NewQuest />
            </div>
          </div>
        </SidebarLayout>
      </div>
    </>
  )
}
