import Head from 'next/head'
import React from 'react'
import Auth from '../../components/common/Auth'
import NewAnnouncement from '../../components/module/NewAnnouncement'

export default function CreateAnnouncement(): JSX.Element {
  return (
    <Auth>
      <Head>
        <title>New Announcement | NUS Connect</title>
        <meta name="description" content="Announcement" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex-grow flex-col dark:bg-gray-800 dark:text-gray-200">
        <NewAnnouncement />
      </div>
    </Auth>
  )
}
