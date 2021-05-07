import { AnswerObject } from '../../pages/quiz'

type QuestionCardProps = {
  question: string
  answers: string[]
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void
  userAnswer: AnswerObject | undefined
  questionNumber: number
  totalQuestions: number
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, answers, callback, userAnswer, questionNumber, totalQuestions }) => {
  return (
    <div>
      <p className="number">
        Question: {questionNumber} / {totalQuestions}
      </p>
      <p className="bg-gray-200" dangerouslySetInnerHTML={{ __html: question }}></p>
      <div className="bg-green-200">
        {answers.map((answer) => (
          <div key={answer}>
            <button disabled={!!userAnswer} onClick={callback} value={answer}>
              <span dangerouslySetInnerHTML={{ __html: answer }}></span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuestionCard
