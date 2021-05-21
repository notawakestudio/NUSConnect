import { renderMdToHtml } from '../common/Util'

const Answer = ({ type, answer, userAnswer, updateAnswer }): JSX.Element => {
  return (
    <div className="w-full border-b text-left" key={answer}>
      <button
        className={`break-normal w-full flex items-center p-2 m-2 ${userAnswer.includes(answer) ? 'bg-blue-700 text-white' : 'bg-gray-100'}`}
        onClick={(e) => {
          updateAnswer(e.currentTarget.value)
        }}
        value={answer}
      >
        <label className="inline-flex items-center mr-2">
          <input type={`${type === 'MRQ' ? 'checkbox' : 'radio'}`} readOnly className="form-radio h-5 w-5 text-gray-600" checked={userAnswer.includes(answer) ? true : false} />
        </label>
        <p className="text-left" dangerouslySetInnerHTML={{ __html: renderMdToHtml(answer) }}></p>
      </button>
    </div>
  )
}
export default Answer
