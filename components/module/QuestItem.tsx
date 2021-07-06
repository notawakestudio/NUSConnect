import Link from 'next/link'
import React from 'react'
import { AiOutlineArrowUp } from 'react-icons/ai'
import { IoIosRemoveCircleOutline } from 'react-icons/io'
import { deleteQuest, Quest } from './ModuleAPI'

export default function QuestItem({
  quest,
  editing,
}: {
  quest: Quest
  editing: boolean
}): JSX.Element {
  return (
    <>
      <div className="flex flex-row items-center">
        {editing ? (
          <button onClick={() => deleteQuest(quest.id)} className="pr-1 pt-1">
            <span className="text-sm text-red-400">
              <IoIosRemoveCircleOutline size="25" />
            </span>
          </button>
        ) : (
          ''
        )}
        <Link href={quest.link} key={quest.id}>
          <div className="shadow-md w-full bg-white dark:bg-gray-700 relative overflow-hidden p-2 my-2 cursor-pointer">
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
      </div>
    </>
  )
}
