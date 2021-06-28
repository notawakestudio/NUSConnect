import Link from 'next/link'
import React from 'react'
import { AiOutlineArrowUp } from 'react-icons/ai'
import { Quest } from './DashboardAPI'

export default function QuestItem({ quest }: { quest: Quest }): JSX.Element {
  return (
    <Link href={quest.link} key={quest.id}>
      <div className="shadow-md w-full bg-gray-100 dark:bg-gray-700 relative overflow-hidden p-2 my-2 cursor-pointer">
        <div className="flex flex-row justify-between">
          <div className="text-base">{quest.description}</div>
          <div className="text-sm  flex items-center">
            <span className="text-sm text-green-400 p-1 mt-1">
              <AiOutlineArrowUp />
            </span>
            <span>{quest.reward.exp} exp</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
