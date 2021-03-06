import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Pagination from '../../components/common/Pagination'
import {
  checkAceBadge,
  checkWrongQuestionBadge,
  hasSameContent,
} from '../../components/common/Util'
import { moduleTitleById } from '../../components/module/ModuleAPI'
import { addQuizToUserRecord } from '../../components/profile/UserAPI'
import AnswerObject from '../../components/quiz/AnswerObject'
import OptionsBar from '../../components/quiz/OptionsBar'
import Question from '../../components/quiz/Question'
import { fetchQuizQuestions, fetchQuizTitle, getAllQuizId } from '../../components/quiz/QuizAPI'
import ScoreCard from '../../components/quiz/ScoreCard'
import { QuestionWithAnswersMixed, QuizMode } from '../../components/quiz/types'
import { useCurrentModule } from '../../components/store/module'
import { useUserId } from '../../components/store/user'

export const getStaticPaths: GetStaticPaths = async () => {
  const quizIds = await getAllQuizId()
  const paths = quizIds.map((quizId) => {
    return {
      params: quizId,
    }
  })
  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const quizId = params.quizId as string
  const quizTitle = await fetchQuizTitle(quizId)
  const quizQuestions = await fetchQuizQuestions(quizId)
  return {
    props: {
      quizTitle,
      quizQuestions,
    },
    revalidate: 30, // In seconds
  }
}

export default function Quiz({
  quizTitle,
  quizQuestions,
}: {
  quizTitle: string
  quizQuestions: QuestionWithAnswersMixed[]
}): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionWithAnswersMixed[]>([])
  const [currQnNumOneBased, setCurrQnNumOneBased] = useState(1)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [quizMode, setQuizMode] = useState(QuizMode.STARTING)
  const userId = useUserId()
  const router = useRouter()
  const { quizId } = router.query
  const {
    state: { moduleId },
  } = useCurrentModule()

  const startQuiz = (): void => {
    setLoading(true)
    setQuizMode(QuizMode.TAKING)
    setUserAnswers(
      Array(quizQuestions.length)
        .fill(0)
        .map((_, index) => {
          return new AnswerObject(
            quizQuestions[index].question,
            index + 1,
            quizQuestions[index].correct_answers,
            quizQuestions[index].type
          )
        })
    )
    setQuestions(quizQuestions)
    setScore(0)
    setCurrQnNumOneBased(1)
    setLoading(false)
  }

  const reviewQuiz = (): void => {
    setCurrQnNumOneBased(1)
    setQuizMode(QuizMode.REVIEWING)
  }

  const updateTotalScore = (): void => {
    const totalScore = quizQuestions.length
    const score = userAnswers.reduce((memo, answerObject) => {
      return memo + (answerObject.isCorrect ? 1 : 0)
    }, 0)
    setScore(score)
    addQuizToUserRecord(userId, moduleId, {
      id: quizId as string,
      score: score,
    })
    if (totalScore == score) {
      setTimeout(() => {
        checkAceBadge(userId, moduleId, moduleTitleById(moduleId))
      }, 300)
    }
    if (totalScore > score) {
      setTimeout(() => {
        checkWrongQuestionBadge(userId, moduleId, moduleTitleById(moduleId))
      }, 300)
    }
    setQuizMode(QuizMode.ENDING)
  }

  const attemptedAllQuestions = (): boolean => {
    return userAnswers.reduce((memo, answerObject) => {
      return memo && answerObject.hasAttempted()
    }, true)
  }

  const saveProgress = (currentAnswer: string[]): void => {
    const isCorrect = hasSameContent(
      currentAnswer,
      questions[currQnNumOneBased - 1].correct_answers
    )
    setUserAnswers((prev) => {
      return prev.map((answerObject) => {
        if (answerObject.qnNumOneBased !== currQnNumOneBased) {
          return answerObject
        } else {
          return answerObject.updateAnswer(currentAnswer).updateCorrect(isCorrect)
        }
      })
    })
  }

  const nextQuestion = (): void => {
    // move on to the next question if not the last question
    const nextQuestionIndex = currQnNumOneBased + 1
    if (nextQuestionIndex > questions.length) {
      // setGameOver(true)
      console.log('Cant')
    } else {
      setCurrQnNumOneBased(nextQuestionIndex)
    }
  }

  const previousQuestion = (): void => {
    // move on to the previous question if not the last question
    const previousQuestionIndex = currQnNumOneBased - 1
    if (previousQuestionIndex === 0) {
      console.log('Cant')
    } else {
      setCurrQnNumOneBased(previousQuestionIndex)
    }
  }
  const changeQuestion = (selectedQuestion: number): void => {
    setCurrQnNumOneBased(selectedQuestion)
  }

  return (
    <div className="grid dark:bg-gray-800 dark:text-gray-100 w-full min-h-screen">
      <div className="container mx-auto pt-2 text-center">
        <Head>
          <title>Attempt Quiz | NUS Connect</title>
          <meta name="description" content="Attempt Quiz" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="container mx-auto text-center flex flex-col items-center py-4">
          <h1 className="py-2 text-base font-bold">{quizTitle}</h1>
          {quizMode === QuizMode.STARTING || quizMode === QuizMode.ENDING ? (
            <div className="shadow-lg rounded-xl bg-blue-500 md:w-64 p-6 dark:bg-gray-800">
              <p className="text-white text-xl">
                {quizMode === QuizMode.ENDING ? `Try again?` : `Ready?`}
              </p>
              <div className="mt-4 flex flex-col">
                <button
                  type="button"
                  className="py-2 px-4  bg-blue-700 hover:bg-blue-800 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
                  onClick={startQuiz}
                  data-cy="seeQuizQuestions">
                  {quizMode === QuizMode.ENDING ? `Retry` : `Start`}
                </button>
                {quizMode === QuizMode.ENDING && (
                  <button
                    type="button"
                    className="py-2 px-4 mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
                    onClick={reviewQuiz}>
                    Review
                  </button>
                )}
                <Link href="/quiz">
                  <a
                    type="button"
                    className="py-2 px-4 mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">
                    Back To All Quizzes
                  </a>
                </Link>
              </div>
            </div>
          ) : null}

          {quizMode === QuizMode.ENDING ? (
            <ScoreCard>
              <p className={`score ${score === questions.length ? 'text-green-500' : ''}`}>
                Score: {score} / {questions.length}
              </p>
            </ScoreCard>
          ) : null}
          {loading && <p>Loading Questions ...</p>}
          {((!loading && quizMode === QuizMode.TAKING) || quizMode === QuizMode.REVIEWING) && (
            <>
              <Question
                questionNumber={currQnNumOneBased}
                totalQuestions={questions.length}
                question={questions[currQnNumOneBased - 1].question}
                answers={questions[currQnNumOneBased - 1].answers}
                type={questions[currQnNumOneBased - 1].type}
                userAnswer={userAnswers[currQnNumOneBased - 1].answer}
                correct_answers={questions[currQnNumOneBased - 1].correct_answers}
                saveProgress={saveProgress}
                quizMode={quizMode}
                questionId={questions[currQnNumOneBased - 1].id}
                key={questions[currQnNumOneBased - 1].id}
              />
              <div className="my-2">
                <OptionsBar
                  quizMode={quizMode}
                  attemptedAllQuestions={attemptedAllQuestions}
                  updateTotalScore={updateTotalScore}
                  questionId={questions[currQnNumOneBased - 1].id}
                />
              </div>
              <Pagination
                numItem={questions.length}
                onClickChange={changeQuestion}
                onClickNext={nextQuestion}
                onClickPrevious={previousQuestion}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
