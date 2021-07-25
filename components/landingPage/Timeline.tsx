import React from 'react'

export default function Timeline() {
  return (
    <div className="bg-white mx-auto w-full h-full px-10 dark:bg-black py-6">
      <span className="flex flex-row space-x-2 justify-center items-center w-full">
        <h1 className="sm:text-4xl text-3xl font-semibold title-font mb-2 text-gray-900 text-center dark:text-gray-100">
          Timeline
        </h1>
        <a href="https://notawakestudio.github.io/NUSConnect-Docs/Timeline" className="">
          <button className="border border-indigo-500 text-indigo-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-indigo-600 focus:outline-none focus:shadow-outline text-xs">
            more details here!
          </button>
        </a>
      </span>
      <div className="relative wrap overflow-hidden p-10 h-full">
        <div
          className="border-2-2 absolute border-opacity-20 border-gray-700 dark:border-gray-400 h-full border"
          style={{ left: '50%' }}></div>
        <div className="mb-8 flex justify-between items-center w-full right-timeline">
          <div className="order-1 w-5/12"></div>
          <div className="z-20 flex items-center order-1 bg-gray-800 dark:bg-gray-700 shadow-xl w-8 h-8 rounded-full">
            <h1 className="mx-auto font-semibold text-lg text-white">1</h1>
          </div>
          <div className="order-1 bg-gray-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
            <h3 className="mb-3 font-bold text-gray-800 text-xl">Started development (3/5/2021)</h3>
            <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
              Started development on NUS Connect. We worked on various aspects of the website
              including the basic functionality of app, the forum, quiz and dashboard designs.
            </p>
          </div>
        </div>

        <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
          <div className="order-1 w-5/12"></div>
          <div className="z-20 flex items-center order-1 bg-gray-800 dark:bg-gray-700 shadow-xl w-8 h-8 rounded-full">
            <h1 className="mx-auto text-white font-semibold text-lg">2</h1>
          </div>
          <div className="order-1 bg-red-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
            <h3 className="mb-3 font-bold text-white text-xl">
              Deployed working website (10/5/2021)
            </h3>
            <p className="text-sm font-medium leading-snug tracking-wide text-white text-opacity-100">
              Our first working version of the website was deployed and was ready to be tested and
              used.
            </p>
          </div>
        </div>

        <div className="mb-8 flex justify-between items-center w-full right-timeline">
          <div className="order-1 w-5/12"></div>
          <div className="z-20 flex items-center order-1 bg-gray-800 dark:bg-gray-700 shadow-xl w-8 h-8 rounded-full">
            <h1 className="mx-auto font-semibold text-lg text-white">3</h1>
          </div>
          <div className="order-1 bg-gray-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
            <h3 className="mb-3 font-bold text-gray-800 text-xl">Milestone 2 (28/6/2021)</h3>
            <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
              Milestone 2 was a turing point for our application. As we started implementing many of
              our core features such as gamification, and forum-quiz integrations.
            </p>
          </div>
        </div>

        <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
          <div className="order-1 w-5/12"></div>
          <div className="z-20 flex items-center order-1 bg-gray-800 dark:bg-gray-700 shadow-xl w-8 h-8 rounded-full">
            <h1 className="mx-auto text-white font-semibold text-lg">4</h1>
          </div>
          <div className="order-1 bg-red-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
            <h3 className="mb-3 font-bold text-white text-xl">Milestone 3 (26/7/2021)</h3>
            <p className="text-sm font-medium leading-snug tracking-wide text-white text-opacity-100">
              This is our final milestone and also marks the first public beta release of the
              application. With all the working features and changes done.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
