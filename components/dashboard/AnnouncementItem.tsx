import { useSession } from 'next-auth/client'
import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { showCurrentDate, renderMdToHtml } from '../common/Util'
import { Announcement } from './DashboardAPI'
import NewAnnouncement from './newAnnouncement'

export default function AnnouncementItem({
  announcement,
}: {
  announcement: Announcement
}): JSX.Element {
  const [session] = useSession()
  const [editing, setEditing] = useState(false)

  return (
    <>
      {editing ? (
        <div className="my-2">
          <NewAnnouncement
            label="Edit Announcement"
            currentAnnouncement={announcement}
            setEditing={setEditing}
          />
        </div>
      ) : (
        <div className="shadow-lg w-full bg-gray-100 dark:bg-gray-700 relative overflow-hidden p-2 my-2">
          <div className="flex flex-col">
            <div className="text-lg font-semibold text-indigo-500">{announcement.title}</div>
            <div className="text-xs font-thin">
              {announcement.author_id} on {showCurrentDate(announcement.created_date)}
            </div>
            <div
              className="py-2"
              dangerouslySetInnerHTML={{
                __html: renderMdToHtml(announcement.content),
              }}></div>
            <button
              onClick={() => setEditing(true)}
              className="text-gray-400 mr-2 inline-flex items-center text-sm">
              <span>edit</span>
              <FaEdit className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
