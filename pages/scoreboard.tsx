function Scoreboard(): JSX.Element {
  return (
    <div className="container flex flex-col mx-auto w-full items-center justify-center">
      <div className="px-4 py-5 sm:px-6 w-full border dark:bg-gray-800 bg-white shadow mb-2 rounded-md">
        <h3 className="text-lg text-center leading-6 font-medium text-gray-900 dark:text-white">
          ScoreBoard
        </h3>
        <p className="mt-1 text-center text-sm text-gray-500 dark:text-gray-200">
          Healthy Competition = Extrinsic Motivation
        </p>
      </div>
      <ul className="flex flex-col">
        <li className="border-gray-400 flex flex-row mb-2">
          <div className="transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
            <div className="flex flex-col w-10 h-10 justify-center items-center mr-4">
              <a href="#" className="block relative">
                <img
                  alt="profil"
                  src=" /cat.jpg"
                  className="mx-auto object-cover rounded-full h-10 w-10 "
                />
              </a>
            </div>
            <div className="flex-1 pl-1 md:mr-16">
              <div className="font-medium dark:text-white">John</div>
            </div>
            <div className="text-gray-600 dark:text-gray-200 text-xs">EXP:120</div>
          </div>
        </li>
        <li className="border-gray-400 flex flex-row mb-2">
          <div className="transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
            <div className="flex flex-col w-10 h-10 justify-center items-center mr-4">
              <a href="#" className="block relative">
                <img
                  alt="profil"
                  src="/cat.jpg"
                  className="mx-auto object-cover rounded-full h-10 w-10 "
                />
              </a>
            </div>
            <div className="flex-1 pl-1 md:mr-16">
              <div className="font-medium dark:text-white">Dueet</div>
            </div>
            <div className="text-gray-600 dark:text-gray-200 text-xs">EXP:110</div>
          </div>
        </li>
        <li className="border-gray-400 flex flex-row mb-2">
          <div className="transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
            <div className="flex flex-col w-10 h-10 justify-center items-center mr-4">
              <a href="#" className="block relative">
                <img
                  alt="profil"
                  src="/cat.jpg"
                  className="mx-auto object-cover rounded-full h-10 w-10 "
                />
              </a>
            </div>
            <div className="flex-1 pl-1 md:mr-16">
              <div className="font-medium dark:text-white">Jun Jie</div>
            </div>
            <div className="text-gray-600 dark:text-gray-200 text-xs">EXP: 100</div>
          </div>
        </li>
        <li className="border-gray-400 flex flex-row mb-2">
          <div className="transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
            <div className="flex flex-col w-10 h-10 justify-center items-center mr-4">
              <a href="#" className="block relative">
                <img
                  alt="profil"
                  src="/cat.jpg"
                  className="mx-auto object-cover rounded-full h-10 w-10 "
                />
              </a>
            </div>
            <div className="flex-1 pl-1 md:mr-16">
              <div className="font-medium dark:text-white">Brian</div>
            </div>
            <div className="text-gray-600 dark:text-gray-200 text-xs">EXP: 0</div>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Scoreboard
