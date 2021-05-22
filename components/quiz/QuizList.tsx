import Search from '../common/Search'
import QuizListItem from './QuizListItem'
import { useRouter } from 'next/router'
import { fetchAllQuizzes } from './QuizAPI'
import { useEffect, useState } from 'react'

const QuizList = (): JSX.Element => {
  const router = useRouter()
  const [quizItems, setQuizItems] = useState([])
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const quizzes = await fetchAllQuizzes()
      const quizItems = quizzes.map((quiz) => {
        return <QuizListItem key={quiz.id} quiz={quiz} />
      })
      setQuizItems(quizItems)
    }
    fetchData()
  }, [])
  return (
    <div className="container flex flex-col mx-auto w-full items-center justify-center bg-white dark:bg-gray-800 rounded-t-lg shadow">
      <div className="px-4 py-5 sm:px-6 border-b w-full">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">All Quizzes</h3>
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onClick={() => router.push('/quiz/make')}>
            Contribute A Quiz
          </button>
          <Search />
        </div>
      </div>
      <ul className="flex flex-col divide divide-y">{quizItems}</ul>
    </div>
  )
}

export default QuizList
