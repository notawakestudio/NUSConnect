import { Spinner } from '@chakra-ui/react'
import Head from 'next/head'
import Auth from '../../components/common/Auth'
import { renderMdToHtml } from '../../components/common/Util'
import NewQuiz from '../../components/quiz/NewQuiz'
import { useAllQuestionsByModule } from '../../components/quiz/QuizAPI'

const QuizForm = (): JSX.Element => {
  const { questions, isLoading } = useAllQuestionsByModule()
  return (
    <>
      <Auth>
        <Head>
          <title>Make A Quiz | NUS Connect</title>
          <meta name="description" content="NUS Connect" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="dark:bg-gray-800 dark:text-gray-200 w-full">
          {isLoading ? (
            <Spinner size="xl" m={20} p={10} />
          ) : (
            <NewQuiz
              questionList={questions.map((question) => {
                return { label: renderMdToHtml(question['question']), value: question['id'] }
              })}
            />
          )}
        </div>
      </Auth>
    </>
  )
}

export default QuizForm
