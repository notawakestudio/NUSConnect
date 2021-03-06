import { Tooltip } from '@chakra-ui/tooltip'
import { useState } from 'react'
import { BsBookmarks } from 'react-icons/bs'

const QuickLink = (): JSX.Element => {
  const [collapse, setCollapse] = useState<boolean>(true)
  return (
    <div className="relative hidden md:block">
      <Tooltip hasArrow label="Quick Links" aria-label="A tooltip">
        <button
          type="button"
          className="px-3 w-10 h-10 bg-gray-600 hover:bg-blue-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          id="options-menu"
          onClick={() => setCollapse(!collapse)}>
          <BsBookmarks />
        </button>
      </Tooltip>
      <div
        className={`origin-top-right absolute mt-2 w-auto rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 ${
          collapse ? 'invisible' : ''
        }`}>
        <div
          className="py-2 text-md text-gray-700"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu">
          <a
            href="https://nusmods.com/"
            target="_blank"
            className=" block px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
            role="menuitem"
            rel="noreferrer">
            <span className="flex flex-col">
              <span>NUSMOD</span>
            </span>
          </a>
          <a
            href="https://luminus.nus.edu.sg/dashboard"
            target="_blank"
            className=" block px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
            role="menuitem"
            rel="noreferrer">
            <span className="flex flex-col">
              <span>LumiNUS</span>
            </span>
          </a>
          <a
            href="https://codecrunch.comp.nus.edu.sg/index.php"
            target="_blank"
            className=" block px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
            role="menuitem"
            rel="noreferrer">
            <span className="flex flex-col">
              <span>CodeCrunch</span>
            </span>
          </a>
          <a
            href="https://docs.oracle.com/en/java/javase/11/docs/api/index.html"
            target="_blank"
            className=" block px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
            role="menuitem"
            rel="noreferrer">
            <span className="flex flex-col">
              <span>Java Docs</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default QuickLink
