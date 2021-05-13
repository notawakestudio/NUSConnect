import { useState } from 'react'
import { AnswerObject } from '../../pages/quiz'

type QuestionItemProps = {
  question: string
  answers: string[]
  callback: (answer: string[]) => void
  userAnswer: AnswerObject | undefined
  questionNumber: number
  totalQuestions: number
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question, answers, callback, userAnswer, questionNumber, totalQuestions }) => {
  const [currentAnswer, setCurrentAnswer] = useState([])
  const updateAnswer = (option: string): void => {
    if (currentAnswer.includes(option)) {
      setCurrentAnswer([...currentAnswer].filter((x) => x !== option))
    } else {
      setCurrentAnswer([...currentAnswer, option])
    }
  }
  return (
    <div>
      <p className="number">
        Question: {questionNumber} / {totalQuestions}
      </p>
      <p className="text-center " dangerouslySetInnerHTML={{ __html: question }}></p>
      <div className="bg-white-200 dark:bg-gray-800 dark:text-white w-prose flex justify-center flex-wrap">
        {answers.map((answer) => (
          <div className="w-full text-left" key={answer}>
            <button className={`break-normal p-2 m-2 ${currentAnswer.includes(answer) ? 'bg-blue-700' : 'bg-gray-200'}`} onClick={(e) => updateAnswer(e.currentTarget.value)} value={answer}>
              <span className="" dangerouslySetInnerHTML={{ __html: answer }}></span>
            </button>
          </div>
        ))}
      </div>
      <button
        className="self-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          callback(currentAnswer)
          setCurrentAnswer([])
        }}
      >
        Confirm answer
      </button>
    </div>
  )
}

export default QuestionItem