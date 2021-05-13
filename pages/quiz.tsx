import { useState } from 'react'
import QuestionItem from '../components/quiz/QuestionItem'
import { fetchQuizQuestions } from '../components/quiz/QuizAPI'
import { QuestionState } from '../components/quiz/QuizAPI'
import Link from 'next/link'
import { hasSameContent } from '../components/common/Util'
import NavBar from '../components/common/NavBar'
import Head from 'next/head'
import Footer from '../components/common/Footer'
import Pagination from '../components/common/Pagination'

export type AnswerObject = {
  question: string
  answer: string[]
  correct: boolean
  correctAnswers: string[]
}
const TOTAL_QUESTIONS = 3

export default function Quiz(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  const startQuiz = (): void => {
    setLoading(true)
    setGameOver(false)

    const newQuestions = fetchQuizQuestions()

    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }
  const checkAnswer = (currentAnswer): void => {
    console.log(currentAnswer)
    if (!gameOver) {
      // Users answer
      const answer = currentAnswer
      // check answer against correct answer
      const correct = hasSameContent(currentAnswer, questions[number].correct_answers)
      // add score if answer is correct
      if (correct) {
        setScore((prev) => prev + 1)
      }
      console.log(correct)
      // save answer in the array for use answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswers: questions[number].correct_answers,
      }
      setUserAnswers((prev) => [...prev, answerObject])
    }
  }
  const nextQuestion = (): void => {
    // move on to the next question if not the last question
    const nextQuestion = number + 1
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber(nextQuestion)
    }
  }

  const previousQuestion = (): void => {
    // move on to the previous question if not the last question
    const previousQuestion = number - 1
    if (previousQuestion === -1) {
      console.log('Cant')
      return
    } else {
      setNumber(previousQuestion)
    }
  }

  return (
    <div className="grid">
      <NavBar />
      <div className="container mx-auto pt-2 text-center">
        <Head>
          <title>View Selected Quiz</title>
          <meta name="description" content="View Selected Quiz" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="container mx-auto text-center flex flex-col items-center">
          <h1 className="px-4 py-2 text-base font-bold">Quiz Title</h1>

          {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
            <div className="shadow-lg rounded-t-xl bg-blue-500 w-full md:w-64 p-6 dark:bg-gray-800">
              <p className="text-white text-xl">Ready?</p>
              <div className="mt-4">
                <button
                  type="button"
                  className="py-2 px-4  bg-blue-700 hover:bg-blue-800 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
                  onClick={startQuiz}
                >
                  Start
                </button>
                <button
                  type="button"
                  className="py-2 px-4 mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
                  onClick={startQuiz}
                >
                  <Link href="/quiz_all">Back To All Quizzes</Link>
                </button>
              </div>
            </div>
          ) : null}

          {!gameOver ? <p className="score">Score: {score}</p> : null}
          {loading && <p>Loading Questions ...</p>}
          {!loading && !gameOver && (
            <QuestionItem
              questionNumber={number + 1}
              totalQuestions={TOTAL_QUESTIONS}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            />
          )}
          {!gameOver && !loading ? (
            <>
              <Pagination numItem={TOTAL_QUESTIONS} onClickNext={nextQuestion} onClickPrevious={previousQuestion} />
            </>
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  )
}