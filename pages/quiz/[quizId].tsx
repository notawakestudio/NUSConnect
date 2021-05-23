import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Footer from '../../components/common/Footer'
import NavBar from '../../components/common/NavBar'
import Pagination from '../../components/common/Pagination'
import { hasSameContent } from '../../components/common/Util'
import Question from '../../components/quiz/Question'
import { fetchQuizQuestions, fetchQuizTitle, getAllQuizId } from '../../components/quiz/QuizAPI'
import ScoreCard from '../../components/quiz/ScoreCard'
import { QuestionWithAnswersMixed, QuizMode } from '../../components/quiz/types'
import AnswerObject from '../../components/quiz/AnswerObject'
export const getStaticPaths: GetStaticPaths = async () => {
  const quizIds = await getAllQuizId()
  const paths = quizIds.map((quizId) => {
    return {
      params: quizId,
    }
  })
  return {
    paths,
    fallback: false,
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
            quizQuestions[index].correct_answers
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
    setScore(
      userAnswers.reduce((memo, answerObject) => {
        return memo + (answerObject.isCorrect ? 1 : 0)
      }, 0)
    )
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
    const nextQuestion = currQnNumOneBased + 1
    if (nextQuestion > questions.length) {
      // setGameOver(true)
      console.log('Cant')
      return
    } else {
      setCurrQnNumOneBased(nextQuestion)
    }
  }

  const previousQuestion = (): void => {
    // move on to the previous question if not the last question
    const previousQuestion = currQnNumOneBased - 1
    if (previousQuestion === 0) {
      console.log('Cant')
      return
    } else {
      setCurrQnNumOneBased(previousQuestion)
    }
  }
  const changeQuestion = (selectedQuestion: number): void => {
    setCurrQnNumOneBased(selectedQuestion)
  }

  return (
    <div className="grid">
      <NavBar />
      <div className="container mx-auto pt-2 text-center">
        <Head>
          <title>Attempt Quiz | NUS Connect</title>
          <meta name="description" content="Attempt Quiz" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="container mx-auto text-center flex flex-col items-center">
          <h1 className="px-4 py-2 text-base font-bold">{quizTitle}</h1>
          {quizMode === QuizMode.STARTING || quizMode === QuizMode.ENDING ? (
            <div className="shadow-lg rounded-t-xl bg-blue-500 w-full md:w-64 p-6 dark:bg-gray-800">
              <p className="text-white text-xl">Ready?</p>
              <div className="mt-4">
                <button
                  type="button"
                  className="py-2 px-4  bg-blue-700 hover:bg-blue-800 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
                  onClick={startQuiz}>
                  Start
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
            <ScoreCard
              child={
                <p className={`score ${score === questions.length ? 'text-green-500' : ''}`}>
                  Score: {score} / {questions.length}
                </p>
              }
            />
          ) : null}
          {loading && <p>Loading Questions ...</p>}
          {!loading && (quizMode === QuizMode.TAKING || quizMode === QuizMode.REVIEWING) && (
            <Question
              questionNumber={currQnNumOneBased}
              totalQuestions={questions.length}
              question={questions[currQnNumOneBased - 1].question}
              answers={questions[currQnNumOneBased - 1].answers}
              type={questions[currQnNumOneBased - 1].type}
              userAnswer={userAnswers[currQnNumOneBased - 1].answer}
              correct_answers={questions[currQnNumOneBased - 1].correct_answers}
              updateTotalScore={updateTotalScore}
              saveProgress={saveProgress}
              attemptedAllQuestions={attemptedAllQuestions}
              quizMode={quizMode}
            />
          )}
          {!loading && (quizMode === QuizMode.TAKING || quizMode === QuizMode.REVIEWING) ? (
            <Pagination
              numItem={questions.length}
              onClickChange={changeQuestion}
              onClickNext={nextQuestion}
              onClickPrevious={previousQuestion}
            />
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  )
}
