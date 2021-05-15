import Answer from './Answer'

type QuestionItemProps = {
  question: string
  answers: string[]
  updateTotalScore: () => void
  saveProgress: (answer: string[]) => void
  type: string
  userAnswer: string[]
  questionNumber: number
  totalQuestions: number
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question, answers, updateTotalScore, saveProgress, type, userAnswer, questionNumber, totalQuestions }) => {
  const updateAnswer = (selectedOption: string): void => {
    if (userAnswer.includes(selectedOption)) {
      saveProgress([...userAnswer].filter((x) => x !== selectedOption))
    } else {
      if (type === 'MCQ') {
        saveProgress([selectedOption])
      } else {
        saveProgress([...userAnswer, selectedOption])
      }
    }
  }

  return (
    <div className="font-fira max-w-prose">
      <p className="number">
        Question: {questionNumber} / {totalQuestions}
      </p>
      <p className="text-left shadow-lg rounded-2xl bg-white dark:bg-gray-800 p-4 dark:text-white mb-2" dangerouslySetInnerHTML={{ __html: question }}></p>
      <div className="shadow-lg rounded-2xl bg-white dark:bg-gray-800 p-4 flex justify-center flex-wrap">
        {answers.map((answer, index) => (
          <Answer key={index} type={type} answer={answer} userAnswer={userAnswer} updateAnswer={updateAnswer} />
        ))}
      </div>
      <button
        className="self-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          updateTotalScore()
        }}
      >
        Confirm & Check Answer
      </button>
    </div>
  )
}

export default QuestionItem
