import { Skeleton } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import SidebarLayout from '../../components/layouts/SidebarLayout'
import { useAllQuizzes } from '../../components/quiz/QuizAPI'
import QuizList from '../../components/quiz/QuizList'

// export const getStaticProps: GetStaticProps = async () => {
//   const quizzes = await fetchAllQuizzes()
//   return {
//     props: {
//       quizzes,
//     },
//     revalidate: 10, // In seconds
//   }
// }

export default function QuizPage(): JSX.Element {
  const { quizzes, isLoading } = useAllQuizzes()
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
            {isLoading ? <Skeleton height="500px" /> : <QuizList quizzes={quizzes} />}
          </div>
        </SidebarLayout>
      </div>
    </>
  )
}
