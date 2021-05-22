import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import Footer from '../../components/common/Footer'
import NavBar from '../../components/common/NavBar'
import { fetchAllQuizzes } from '../../components/quiz/QuizAPI'
import QuizList from '../../components/quiz/QuizList'
import { QuizItem } from '../../components/quiz/QuizListItem'

export const getStaticProps: GetStaticProps = async () => {
  const quizzes = await fetchAllQuizzes()
  return {
    props: {
      quizzes,
    },
  }
}

export default function Quiz({ quizzes }: { quizzes: QuizItem[] }): JSX.Element {
  return (
    <div className="grid">
      <NavBar />
      <div className="container mx-auto pt-2 text-center">
        <Head>
          <title>View All Quizzes | NUS Connect</title>
          <meta name="description" content="View All Quizzes" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <QuizList quizzes={quizzes} />
        <Footer />
      </div>
    </div>
  )
}
