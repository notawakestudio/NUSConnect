import Head from 'next/head'
import React from 'react'
import Footer from '../components/common/Footer'
import NavBar from '../components/common/NavBar'
import QuizList from '../components/quiz/QuizList'

export default function QuizAll(): JSX.Element {
  return (
    <div className="grid">
      <NavBar />
      <div className="container mx-auto pt-2 text-center">
        <Head>
          <title>View All Quizzes</title>
          <meta name="description" content="View All Quizzes" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <QuizList />
        <Footer />
      </div>
    </div>
  )
}
