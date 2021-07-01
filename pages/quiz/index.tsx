import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import SidebarLayout from '../../components/layouts/SidebarLayout'
import { fetchAllQuizzes } from '../../components/quiz/QuizAPI'
import QuizList from '../../components/quiz/QuizList'
import { Quiz } from '../../components/quiz/types'

export const getStaticProps: GetStaticProps = async () => {
  const quizzes = await fetchAllQuizzes()
  return {
    props: {
      quizzes,
    },
    revalidate: 10, // In seconds
  }
}

export default function QuizPage({ quizzes }: { quizzes: Quiz[] }): JSX.Element {
  return (
    <>
      <Head>
        <title>View All Quizzes | NUS Connect</title>
        <meta name="description" content="View All Quizzes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="dark:bg-gray-800 w-full">
        <SidebarLayout>
          <div className="w-full bg-white dark:bg-gray-800">
            <QuizList quizzes={quizzes} />
          </div>
        </SidebarLayout>
      </div>
    </>
  )
}
