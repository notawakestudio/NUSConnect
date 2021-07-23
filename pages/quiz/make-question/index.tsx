import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { GrFormNextLink } from 'react-icons/gr'
import Auth from '../../../components/common/Auth'
import NewQuestion from '../../../components/quiz/NewQuestion'

const QuestionForm = (): JSX.Element => {
  return (
    <>
      <Auth>
        <Head>
          <title>Make A Question | NUS Connect</title>
          <meta name="description" content="NUS Connect" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="dark:bg-gray-800 dark:text-gray-200 w-full">
          <div className="px-4 md:px-6 pt-20">
            <div className="flex justify-between text-gray-600 dark:text-gray-200">
              <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
                Make a question
              </h1>
              <Link href={'/quiz/make-quiz'}>
                <span className="shadow-md p-2 cursor-pointer bg-white hover:bg-indigo-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-500 flex flex-row items-center w-auto">
                  <span className="items-center pr-1">
                    <GrFormNextLink />
                  </span>
                  <span>Done? Go make a quiz!</span>
                </span>
              </Link>
            </div>
            <NewQuestion />
          </div>
        </div>
      </Auth>
    </>
  )
}
export default QuestionForm
