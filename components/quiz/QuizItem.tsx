import Image from 'next/image'
import Link from 'next/link'
import { Quiz } from './types'
const QuizItem = ({ quiz }: { quiz: Quiz }): JSX.Element => {
  return (
    <Link href={`/quiz/${quiz.id}`}>
      <li className="flex flex-row text-left hover:bg-green-500">
        <div className="select-none cursor-pointer flex flex-1  items-center p-4 ">
          <div className="flex flex-col w-10 h-10 justify-center items-center mr-4">
            <Image
              width={40}
              height={40}
              alt="profile"
              src="/cat.jpg"
              className="mx-auto object-cover rounded-full h-10 w-10 cursor-pointer"
            />
          </div>
          <div className="flex-1 pl-1 mr-4">
            <div className="font-medium dark:text-white">{quiz.title}</div>
          </div>
          <div className="flex-col flex-1">
            <div className="text-gray-600 dark:text-gray-200 text-xs px-2">
              Created on: {quiz.date}
            </div>
            <div className="text-gray-600 dark:text-gray-200 text-xs px-2">
              Author: {quiz.author}
            </div>
            <div className="text-gray-600 dark:text-gray-200 text-xs px-2">Week: {quiz.week}</div>
            <div className="text-gray-600 dark:text-gray-200 text-xs px-2">
              Tags: {quiz.tags.reduce((memo, tag) => memo + ' #' + tag, '')}
            </div>
          </div>
          <button className="w-24 text-right flex justify-end">
            <svg
              width="20"
              fill="currentColor"
              height="20"
              className="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
            </svg>
          </button>
        </div>
      </li>
    </Link>
  )
}

export default QuizItem
