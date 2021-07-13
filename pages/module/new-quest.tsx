import Head from 'next/head'
import React from 'react'
import NewQuest from '../../components/module/NewQuest'
import 'react-datepicker/dist/react-datepicker.css'
import Auth from '../../components/common/Auth'

export default function CreateAnnouncement(): JSX.Element {
  return (
    <Auth>
      <Head>
        <title>New Quest | NUS Connect</title>
        <meta name="description" content="Announcement" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex-grow flex-col dark:bg-gray-800 dark:text-gray-200">
        <NewQuest />
      </div>
    </Auth>
  )
}
