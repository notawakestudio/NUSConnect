import { useState } from 'react'
import { AnswerObject } from '../../pages/quiz'

type QuestionCardProps = {
  question: string
  answers: string[]
  callback: (answer: string[]) => void
  userAnswer: AnswerObject | undefined
  questionNumber: number
  totalQuestions: number
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, answers, callback, userAnswer, questionNumber, totalQuestions }) => {
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
      <p className="bg-gray-200" dangerouslySetInnerHTML={{ __html: question }}></p>
      <div className="bg-green-200 min-h-min flex justify-evenly flex-wrap">
        {answers.map((answer) => (
          <div key={answer}>
            <button className={`min-w-max min-h-max p-2 m-2 ${currentAnswer.includes(answer) ? 'bg-green-700' : 'bg-blue-200'}`} onClick={(e) => updateAnswer(e.currentTarget.value)} value={answer}>
              <span dangerouslySetInnerHTML={{ __html: answer }}></span>
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

export default QuestionCard
