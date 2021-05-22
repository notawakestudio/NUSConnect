import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Footer from '../../components/common/Footer'
import MDEditor from '../../components/common/MDEditor'
import NavBar from '../../components/common/NavBar'
import Pagination from '../../components/common/Pagination'
import { hasSameContent } from '../../components/common/Util'
import QuestionItem from '../../components/quiz/QuestionItem'
import { fetchQuizQuestions, fetchQuizTitle, getAllQuizId, QuestionWithAnswersMixed } from '../../components/quiz/QuizAPI'

class AnswerObject {
  question: string
  qnNumOneBased: number
  answer: string[]
  isCorrect: boolean
  correctAnswers: string[]
  constructor(question, qnNumOneBased, correctAnswers) {
    this.qnNumOneBased = qnNumOneBased
    this.question = question
    this.answer = []
    this.isCorrect = false
    this.correctAnswers = correctAnswers
  }

  updateAnswer(answer: string[]): AnswerObject {
    this.answer = answer
    return this
  }
  updateCorrect(isCorrect: boolean): AnswerObject {
    this.isCorrect = isCorrect
    return this
  }
}
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllQuizId()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const quizTitle = fetchQuizTitle(params.quizId as string)
  return {
    props: {
      quizTitle,
    },
  }
}

export default function Quiz({ quizTitle }: { quizTitle: string }): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionWithAnswersMixed[]>([])
  const [currQnNumOneBased, setCurrQnNumOneBased] = useState(1)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)
  const router = useRouter()
  const { quizId } = router.query
  const startQuiz = (): void => {
    setLoading(true)
    setGameOver(false)
    const questions = fetchQuizQuestions(quizId as string)
    setUserAnswers(
      Array(questions.length)
        .fill(0)
        .map((_, index) => {
          return new AnswerObject(questions[index].question, index + 1, questions[index].correct_answers)
        })
    )
    setQuestions(questions)
    setScore(0)
    setCurrQnNumOneBased(1)
    setLoading(false)
  }

  const updateTotalScore = (): void => {
    setScore(
      userAnswers.reduce((memo, answerObject) => {
        return memo + (answerObject.isCorrect ? 1 : 0)
      }, 0)
    )
  }
  const saveProgress = (currentAnswer: string[]): void => {
    const isCorrect = hasSameContent(currentAnswer, questions[currQnNumOneBased - 1].correct_answers)
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
  // useEffect(() => {
  // debug
  //   console.log(userAnswers)
  // })

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
          {gameOver ? (
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
                  onClick={() => router.push('/quiz')}
                >
                  Back To All Quizzes
                </button>
              </div>
            </div>
          ) : null}

          {!gameOver ? (
            <p className="score">
              Score: {score} / {questions.length}
            </p>
          ) : null}
          {loading && <p>Loading Questions ...</p>}
          {!loading && !gameOver && (
            <QuestionItem
              questionNumber={currQnNumOneBased}
              totalQuestions={questions.length}
              question={questions[currQnNumOneBased - 1].question}
              answers={questions[currQnNumOneBased - 1].answers}
              type={questions[currQnNumOneBased - 1].type}
              userAnswer={userAnswers[currQnNumOneBased - 1].answer}
              updateTotalScore={updateTotalScore}
              saveProgress={saveProgress}
            />
          )}
          {!gameOver && !loading ? <Pagination numItem={questions.length} onClickChange={changeQuestion} onClickNext={nextQuestion} onClickPrevious={previousQuestion} /> : null}
          <MDEditor />
        </div>
      </div>
      <Footer />
    </div>
  )
}
