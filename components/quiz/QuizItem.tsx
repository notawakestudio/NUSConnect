import Image from 'next/image'
import Link from 'next/link'
import { Quiz } from './types'
import { IoIosArrowForward } from 'react-icons/io'

const QuizItem = ({ quiz }: { quiz: Quiz }): JSX.Element => {
  return (
    <Link href={`/quiz/${quiz.id}`}>
      <li className="flex flex-row text-left hover:bg-green-500">
        <div className="select-none cursor-pointer flex flex-1  items-center p-4 ">
          <div className="flex flex-col pl-1 mr-4">
            <div className="font-medium dark:text-white">{quiz.title}</div>
            <div className="text-gray-600 dark:text-gray-200 text-xs">{quiz.date}</div>
          </div>
          <div className="flex-col flex-1 text-gray-600 dark:text-gray-200 text-xs">
            <div>Author: {quiz.author}</div>
            <div>Week: {quiz.week}</div>
            <div>Tags: {quiz.tags.reduce((memo, tag) => memo + ' #' + tag, '')}</div>
          </div>
          <button className="w-24 text-right flex justify-end">
            <IoIosArrowForward
              size={30}
              className="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500"
            />
          </button>
        </div>
      </li>
    </Link>
  )
}

export default QuizItem
