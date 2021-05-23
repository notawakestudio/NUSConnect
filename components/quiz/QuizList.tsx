import Search from '../common/Search'
import QuizItem from './QuizItem'
import Link from 'next/link'
import { Quiz } from './types'

const QuizList = ({ quizzes }: { quizzes: Quiz[] }): JSX.Element => {
  return (
    <div className="container flex flex-col mx-auto w-full items-center justify-center bg-white dark:bg-gray-800 rounded-t-lg shadow">
      <div className="px-4 py-5 sm:px-6 border-b w-full">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">All Quizzes</h3>
        <div className="flex justify-center">
          <Link href="/quiz/make">
            <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
              Contribute A Quiz
            </a>
          </Link>
          <Search />
        </div>
      </div>
      <ul className="flex flex-col divide divide-y">
        {quizzes.map((quiz) => {
          return <QuizItem key={quiz.id} quiz={quiz} />
        })}
      </ul>
    </div>
  )
}

export default QuizList
