import { renderMdToHtml } from '../common/Util'
import { QuizMode } from './types'
type AnswerProps = {
  type: string
  answerText: string
  userAnswer: string[]
  correct_answers: string[]
  quizMode: QuizMode
  updateAnswer: (selectedOption: string) => void
}
const Answer = ({
  type,
  answerText,
  userAnswer,
  correct_answers,
  quizMode,
  updateAnswer,
}: AnswerProps): JSX.Element => {
  return (
    <div className="w-full border-b text-left" key={answerText}>
      <button
        className={`break-normal w-full flex items-center p-2 m-2 ${
          userAnswer.includes(answerText) ? 'bg-blue-700 text-white' : 'bg-gray-100'
        } ${
          quizMode === QuizMode.REVIEWING && correct_answers.includes(answerText)
            ? 'border-dotted border-green-500 border-4'
            : ''
        }`}
        onClick={(e) => {
          updateAnswer(e.currentTarget.value)
        }}
        value={answerText}>
        <label className="inline-flex items-center mr-2">
          <input
            type={`${type === 'MRQ' ? 'checkbox' : 'radio'}`}
            readOnly
            className="form-radio h-5 w-5 text-gray-600"
            checked={userAnswer.includes(answerText) ? true : false}
          />
        </label>
        <p
          className="text-left"
          dangerouslySetInnerHTML={{ __html: renderMdToHtml(answerText) }}></p>
      </button>
    </div>
  )
}
export default Answer
