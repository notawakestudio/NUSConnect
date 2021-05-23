import Answer from './Answer'
import Link from 'next/link'
import { renderMdToHtml } from '../common/Util'
import Alert from '../common/Alert'
import { useState } from 'react'
type QuestionProps = {
  question: string
  answers: string[]
  updateTotalScore: () => void
  saveProgress: (answer: string[]) => void
  attemptedAllQuestions: () => boolean
  type: string
  userAnswer: string[]
  questionNumber: number
  totalQuestions: number
}

const Question = ({
  question,
  answers,
  updateTotalScore,
  saveProgress,
  attemptedAllQuestions,
  type,
  userAnswer,
  questionNumber,
  totalQuestions,
}: QuestionProps): JSX.Element => {
  const [alert, setAlert] = useState(false)
  const updateAnswer = (selectedOption: string): void => {
    if (userAnswer.includes(selectedOption)) {
      saveProgress([...userAnswer].filter((x) => x !== selectedOption))
    } else {
      if (type === 'MCQ') {
        saveProgress([selectedOption])
      } else if (type === 'MRQ') {
        saveProgress([...userAnswer, selectedOption])
      } else {
        console.log('other question types')
      }
    }
  }

  return (
    <div className="font-fira max-w-prose">
      <Alert show={alert} setShow={setAlert} />
      <p className="number">
        Question: {questionNumber} / {totalQuestions}
      </p>
      <p
        className="text-left shadow-lg rounded-2xl bg-white dark:bg-gray-800 p-4 dark:text-white mb-2"
        dangerouslySetInnerHTML={{ __html: renderMdToHtml(question) }}></p>
      <div className="shadow-lg rounded-2xl bg-white dark:bg-gray-800 p-4 flex justify-center flex-wrap">
        {answers.map((answerText, index) => (
          <Answer
            key={index}
            type={type}
            answerText={answerText}
            userAnswer={userAnswer}
            updateAnswer={updateAnswer}
          />
        ))}
      </div>
      <button
        className="self-center bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          if (attemptedAllQuestions()) {
            updateTotalScore()
          } else {
            setAlert(true)
          }
        }}>
        Submit
      </button>
      <Link href="/quiz">
        <a className="self-center bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back to Quiz List
        </a>
      </Link>
    </div>
  )
}

export default Question
