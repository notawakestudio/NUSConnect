const ScoreCard = ({ children }: { children: HTMLElement }): JSX.Element => {
  return (
    <div className="my-2 bg-white rounded-lg shadow-md p-6">
      <div className="w-16 mx-auto relative -mt-10 mb-3">
        <img className="-mt-1" src="https://www.tailwind-kit.com/icons/cookie.svg" alt="cookie" />
      </div>
      <span className="w-full sm:w-48  block leading-normal text-gray-800 text-md mb-3">
        Result
      </span>
      <div className="flex items-center justify-center">{children}</div>
    </div>
  )
}

export default ScoreCard
