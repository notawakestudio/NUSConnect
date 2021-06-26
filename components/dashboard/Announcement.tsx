import Link from 'next/link'
import React from 'react'
import { AiOutlineArrowUp } from 'react-icons/ai'

export default function Announcement(weekly): JSX.Element {
  return (
    <div className="w-full" key={weekly['id']}>
      <div className="shadow-lg px-4 py-6 w-full bg-white dark:bg-gray-700 relative">
        <p className="text-sm w-max text-gray-700 dark:text-white font-semibold border-b border-gray-200">
          Week {weekly['week']}
        </p>
        <div className="flex-col items-end space-x-2 my-6">
          <p className="text-xl text-black dark:text-white font-semibold">
            Annoucement:
            <br />
          </p>
          <span className="text-green-500 text-xl font-bold flex items-center">
            {weekly['announcement']}
          </span>
        </div>
        <div className="dark:text-white">
          {weekly['tasks'].map((task) => {
            return (
              <Link href={task['link']} key={task['id']}>
                <div className="flex items-center pb-2 mb-2 text-sm sm:space-x-12 cursor-pointer justify-between border-b border-gray-200">
                  <p>{task['description']}</p>
                  <div className="flex items-end text-xs">
                    {task['exp']}
                    <span className="flex items-center">
                      <AiOutlineArrowUp className="h-3 text-green-500" />
                      exp
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
