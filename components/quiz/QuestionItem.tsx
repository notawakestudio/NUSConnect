import { useState } from 'react'
import { AnswerObject } from '../../pages/quizzes/[quizId]'

type QuestionItemProps = {
  question: string
  answers: string[]
  callback: (answer: string[]) => void
  type: string
  userAnswer: AnswerObject | undefined
  questionNumber: number
  totalQuestions: number
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question, answers, callback, type, userAnswer, questionNumber, totalQuestions }) => {
  const [currentAnswer, setCurrentAnswer] = useState([])
  const updateAnswer = (option: string): void => {
    if (currentAnswer.includes(option)) {
      setCurrentAnswer([...currentAnswer].filter((x) => x !== option))
    } else {
      setCurrentAnswer([...currentAnswer, option])
    }
  }
  return (
    <div className="font-fira max-w-prose">
      <p className="number">
        Question: {questionNumber} / {totalQuestions}
      </p>
      <p className="text-left shadow-lg rounded-2xl bg-white dark:bg-gray-800 p-4 dark:text-white mb-2" dangerouslySetInnerHTML={{ __html: question }}></p>
      <div className="shadow-lg rounded-2xl bg-white dark:bg-gray-800 p-4 flex justify-center flex-wrap">
        {answers.map((answer) => (
          <div className="w-full border-b text-left" key={answer}>
            <button
              className={`break-normal w-full flex items-center p-2 m-2 ${currentAnswer.includes(answer) ? 'bg-blue-700' : 'bg-gray-200'}`}
              onClick={(e) => updateAnswer(e.currentTarget.value)}
              value={answer}
            >
              <label className="inline-flex items-center mr-2">
                <input type={`${type === 'MRQ' ? 'checkbox' : 'radio'}`} className="form-radio h-5 w-5 text-gray-600" checked={currentAnswer.includes(answer) ? true : false} />
              </label>
              <p className="text-left" dangerouslySetInnerHTML={{ __html: answer }}></p>
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
      <button
        className="self-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          callback(currentAnswer)
          setCurrentAnswer([])
        }}
      >
        Save Progress
      </button>
    </div>
  )
}

export default QuestionItem
