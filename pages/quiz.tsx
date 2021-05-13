import { useState } from 'react'
import QuestionCard from '../components/quiz/QuestionCard'
import { fetchQuizQuestions } from '../components/quiz/API'
import { QuestionState } from '../components/quiz/API'
import Link from 'next/link'
import { hasSameContent } from '../components/common/Util'

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
    const nextQuestion = number - 1
    if (nextQuestion === 0) {
      return
    } else {
      setNumber(nextQuestion)
    }
  }

  return (
    <div className="container mx-auto text-center flex flex-col">
      <h1>Quiz</h1>
      <Link href="/">Back</Link>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start self-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={startQuiz}>
          Start
        </button>
      ) : null}

      {!gameOver ? <p className="score">Score: {score}</p> : null}
      {loading && <p>Loading Questions ...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNumber={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!gameOver && !loading && number !== TOTAL_QUESTIONS - 1 ? (
        <button className="next self-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
    </div>
  )
}
