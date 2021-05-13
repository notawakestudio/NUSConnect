import Link from 'next/link'
import { useEffect, useState } from 'react'
import Search from './Search'
const NavBar = (): JSX.Element => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])
  return (
    <header className="sticky top-0 z-50 w-full shadow-md bg-white dark:bg-gray-700 items-center h-16 rounded-sm">
      <div className="flex flex-col justify-center h-full px-3 mx-auto flex-center">
        <div className="items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0">
          <div className="container left-60 flex w-3/4 h-auto">
            <div className="flex w-full h-full">
              <Link href="/">
                <button className="py-2 px-4  bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
                  Home
                </button>
              </Link>
              <Search />
              <button
                className="py-2 px-4  bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                Toggle Dark Mode
              </button>
            </div>
          </div>
          <div className="p-1 flex items-center justify-end w-1/4 ml-5 mr-4 sm:mr-0 sm:right-auto">
            <a href="#" className="block ">
              <img alt="profil" src="https://timesofindia.indiatimes.com/photo/67586673.cms" className="mx-auto object-cover rounded-full h-10 w-10 " />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavBar
