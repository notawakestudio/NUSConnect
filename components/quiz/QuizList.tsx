import Search from '../common/Search'
import QuizItem from './QuizItem'
import Link from 'next/link'
import { Quiz } from './types'

const QuizList = ({ quizzes }: { quizzes: Quiz[] }): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-start bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-full">
      <div className="px-2 py-4 border-b">
        <span className="flex text-lg leading-4 font-medium justify-center mb-2">All Quizzes</span>
        <div className="xs:flex justify-center space-y-2 xs:space-y-0">
          <Link href="/quiz/make-question">
            <button className="whitespace-nowrap bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-2 rounded-lg content-center justify-center">
              Contribute A Quiz
            </button>
          </Link>
          <Search />
        </div>
      </div>
      <div className="relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
        <div className="block w-full overflow-x-auto">
          <table className="items-start w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Quiz Name
                </th>
                <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                  Date
                </th>
                <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                  Week
                </th>
                <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                  Author
                </th>
                <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Tags
                </th>
                <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center"></th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz) => {
                return <QuizItem key={quiz.id} quiz={quiz} />
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default QuizList
