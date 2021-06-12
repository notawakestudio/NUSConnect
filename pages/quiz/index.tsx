import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import Auth from '../../components/common/Auth'
import Footer from '../../components/common/Footer'
import Layout from '../../components/common/Layout'
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
      <Auth>
        <div className="dark:bg-gray-800 w-full">
          <Layout>
            <div className="flex w-full text-center bg-white dark:bg-gray-800">
              <QuizList quizzes={quizzes} />
            </div>
          </Layout>
        </div>
      </Auth>
    </>
  )
}
