import Search from '../common/Search'
import QuizItem from './QuizItem'
import Link from 'next/link'
import { Quiz } from './types'

const QuizList = ({ quizzes }: { quizzes: Quiz[] }): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-start bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
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
      <ul className="flex flex-col divide divide-y">
        {quizzes.map((quiz) => {
          return <QuizItem key={quiz.id} quiz={quiz} />
        })}
      </ul>
    </div>
  )
}

export default QuizList
