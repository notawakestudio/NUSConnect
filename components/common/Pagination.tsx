const Pagination = ({ numItem, onClickNext, onClickPrevious }: { numItem: number; onClickNext: () => void; onClickPrevious: () => void }): JSX.Element => {
  const buttonList = Array.from({ length: numItem }, (v, k) => k + 1).map((num) => {
    return (
      <button key={num} type="button" className="w-full px-4 py-2  text-base  bg-white border hover:bg-gray-100 ">
        {num}
      </button>
    )
  })
  return (
    <div className="flex items-center">
      <button type="button" className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100" onClick={onClickPrevious}>
        <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
          <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
        </svg>
      </button>
      {buttonList}
      <button type="button" className="w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100" onClick={onClickNext}>
        <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
          <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
        </svg>
      </button>
    </div>
  )
}

export default Pagination
