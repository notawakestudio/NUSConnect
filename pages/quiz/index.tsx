import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import Auth from '../../components/common/Auth'
import Footer from '../../components/common/Footer'
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
    <div className="grid">
      <Auth>
        <div className="container mx-auto pt-2 text-center">
          <Head>
            <title>View All Quizzes | NUS Connect</title>
            <meta name="description" content="View All Quizzes" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <QuizList quizzes={quizzes} />
        </div>
      </Auth>
    </div>
  )
}
