import { Skeleton } from '@chakra-ui/react'
import Head from 'next/head'
import { useAllQuizzesByModule } from '../../components/quiz/QuizAPI'
import QuizList from '../../components/quiz/QuizList'

export default function QuizPage(): JSX.Element {
  const { quizzes, isLoading } = useAllQuizzesByModule()
  return (
    <>
      <Head>
        <title>View All Quizzes | NUS Connect</title>
        <meta name="description" content="View All Quizzes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="dark:bg-gray-800 w-full">
        <div className="w-full bg-white dark:bg-gray-800">
          {isLoading ? <Skeleton height="500px" /> : <QuizList quizzes={quizzes} />}
        </div>
      </div>
    </>
  )
}
