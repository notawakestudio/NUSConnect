import { useRef } from 'react'
import { GrFormClose } from 'react-icons/gr'

const Alert = ({
  show,
  setShow,
}: {
  show: boolean
  setShow: (val: boolean) => void
}): JSX.Element => {
  const alertBox = useRef<HTMLDivElement>()
  const hideAlertBox = (): void => {
    setShow(false)
  }
  return (
    <div
      className={`border-t-4 rounded-b text-red-400 px-4 py-3 shadow-md ${show ? '' : 'hidden'}`}
      role="alert"
      ref={alertBox}>
      <div className="flex justify-between">
        <div className="py-1">
          <svg
            className="fill-current h-6 w-6 text-teal-500 mr-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
          </svg>
        </div>
        <div>
          <p className="font-bold">Please attempt all questions!</p>
          <p className="text-sm">Make sure you check all of them!</p>
        </div>
        <button className="px-4 py-3" onClick={hideAlertBox}>
          <GrFormClose />
        </button>
      </div>
    </div>
  )
}

export default Alert
