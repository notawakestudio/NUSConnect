import Head from 'next/head'
import React from 'react'
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
          <NewQuestion />
        </div>
      </Auth>
    </>
  )
}
export default QuestionForm
