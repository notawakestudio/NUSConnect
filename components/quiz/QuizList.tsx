import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoMdAddCircleOutline } from 'react-icons/io'
import Search, { Design } from '../common/Search'
import QuizItemCard from './QuizItemCard'
import { Quiz } from './types'

const QuizList = ({ quizzes }: { quizzes: Quiz[] }): JSX.Element => {
  const [query, setQuery] = useState('')
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([])
  useEffect(() => {
    function fn(): void {
      if (query.trim() === '') {
        return setFilteredQuizzes(quizzes)
      } else {
        setFilteredQuizzes(
          quizzes.filter((quiz) => quiz.title.toLowerCase().includes(query.toLowerCase()))
        )
      }
    }
    fn()
  }, [query, quizzes])
  return (
    <div className="flex flex-col w-full">
      <div className="px-4 md:px-6 pt-20">
        <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">Quiz</h1>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-1 mt-2">
          <div className="sm:flex items-center w-auto p-1 dark:text-gray-200">
            <AiOutlineSearch size={25} className="mr-1 hidden md:flex" />
            <Search design={Design.square} query={query} setQuery={setQuery} />
          </div>
          <Link href={'/quiz/make-question'}>
            <span className="shadow-md p-2 cursor-pointer bg-white hover:bg-indigo-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-500 flex flex-row items-center w-auto h-auto">
              <span className="items-center pr-1">
                <IoMdAddCircleOutline />
              </span>
              <span>Contribute A Quiz</span>
            </span>
          </Link>
        </div>
      </div>
      <div className="flex w-full bg-white dark:bg-gray-800 p-4">
        <div className="flex flex-col items-center lg:items-start justify-start bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-full">
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-start">
            {filteredQuizzes.map((quiz) => {
              return <QuizItemCard key={quiz.id} quiz={quiz} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizList
