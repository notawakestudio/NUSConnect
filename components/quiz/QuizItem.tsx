import Image from 'next/image'
import Link from 'next/link'
import { Quiz } from './types'
import { IoIosArrowForward } from 'react-icons/io'

const QuizItem = ({ quiz }: { quiz: Quiz }): JSX.Element => {
  const tags = quiz.tags

  return (
    <Link href={`/quiz/${quiz.id}`}>
      <li className="flex flex-row text-left hover:bg-indigo-200 dark:hover:bg-gray-700">
        <div className="select-none cursor-pointer flex flex-row flex-1 items-center p-4 space-x-3">
          <div className="flex flex-col pl-1 mr-4">
            <div className="text-md font-bold text-gray-800 dark:text-gray-100">{quiz.title}</div>
            <div className="text-gray-600 dark:text-gray-200 text-xs">{quiz.date}</div>
          </div>
          <div className="flex-col flex-1 text-gray-600 dark:text-gray-200 text-xs">
            <div>Author: {quiz.author}</div>
            <div>Week: {quiz.week}</div>
            <div>Tags: {quiz.tags.reduce((memo, tag) => memo + ' #' + tag, '')}</div>
            <div className="flex flex-wrap justify-starts items-center mt-1">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="mr-1 text-xs py-1 px-2 text-gray-600 bg-blue-100 rounded-2xl">
                  #{tag}
                </div>
              ))}
            </div>
          </div>
          <button className="text-right flex justify-end">
            <IoIosArrowForward
              size={30}
              className="hover:text-gray-800 dark:hover:text-white dark:text-gray-300 text-gray-500"
            />
          </button>
        </div>
      </li>
    </Link>
  )
}

export default QuizItem
