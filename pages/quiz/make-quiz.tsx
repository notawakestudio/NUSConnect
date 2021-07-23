import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import Auth from '../../components/common/Auth'
import { renderMdToHtml } from '../../components/common/Util'
import NewQuiz from '../../components/quiz/NewQuiz'
import { fetchAllQuestions } from '../../components/quiz/QuizAPI'

export const getStaticProps: GetStaticProps = async () => {
  const questions = await fetchAllQuestions()
  const questionList = questions.map((question) => {
    return { label: renderMdToHtml(question['question']), value: question['id'] }
  })
  return {
    props: {
      questionList,
    },
    revalidate: 10,
  }
}

const QuizForm = ({
  questionList,
}: {
  questionList: { label: string; value: string }
}): JSX.Element => {
  return (
    <>
      <Auth>
        <Head>
          <title>Make A Quiz | NUS Connect</title>
          <meta name="description" content="NUS Connect" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="dark:bg-gray-800 dark:text-gray-200 w-full">
          <NewQuiz questionList={questionList} />
        </div>
      </Auth>
    </>
  )
}

export default QuizForm
