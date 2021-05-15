import { useState } from 'react'

const QuickLink = (): JSX.Element => {
  const [collapse, setCollapse] = useState<boolean>(true)
  return (
    <div className="relative text-left mx-1">
      <div>
        <button
          type="button"
          className="px-4 py-2 w-28 bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          id="options-menu"
          onClick={() => setCollapse(!collapse)}
        >
          Quick Link
        </button>
      </div>
      <div className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 ${collapse ? 'invisible' : ''}`}>
        <div className="py-1 " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <a
            href="https://nusmods.com/"
            target="_blank"
            className=" block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
            role="menuitem"
            rel="noreferrer"
          >
            <span className="flex flex-col">
              <span>NUSMOD</span>
            </span>
          </a>
          <a
            href="https://luminus.nus.edu.sg/dashboard"
            target="_blank"
            className=" block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
            role="menuitem"
            rel="noreferrer"
          >
            <span className="flex flex-col">
              <span>LumiNUS</span>
            </span>
          </a>
          <a
            href="https://codecrunch.comp.nus.edu.sg/index.php"
            target="_blank"
            className=" block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
            role="menuitem"
            rel="noreferrer"
          >
            <span className="flex flex-col">
              <span>CodeCrunch</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default QuickLink
