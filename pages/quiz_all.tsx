import Head from 'next/head'
import React from 'react'
import Footer from '../components/common/Footer'
import NavBar from '../components/common/NavBar'
import Search from '../components/common/Search'

export default function QuizAll(): JSX.Element {
  return (
    <>
      <NavBar />
      <div className="container mx-auto pt-2 text-center">
        <Head>
          <title>View All Quizzes</title>
          <meta name="description" content="View All Quizzes" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="flex justify-between">
          <button className="pr-2">New Quiz</button>
          <Search />
        </div>
        <h1>Quizzes</h1>
        <Footer />
      </div>
    </>
  )
}
