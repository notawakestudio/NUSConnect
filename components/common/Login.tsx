import { signIn, signOut, useSession } from 'next-auth/client'
import React from 'react'

export default function Login(): JSX.Element {
  const [session] = useSession()

  return (
    <div className="container flex justify-center">
      {!session && (
        <div>
          <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
            <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
              Login To Your Account
            </div>
            <div className="flex-column gap-4 item-center">
              <button
                type="button"
                onClick={() => signIn('github', { callbackUrl: 'http://localhost:3000/dashboard' })}
                className="mb-3 py-2 px-4 flex justify-center items-center  bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                <img
                  className="w-5 h-5 mr-2"
                  alt="github-logo"
                  src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/github-icon.svg"></img>
                Connect with Github
              </button>
              <button
                type="button"
                onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/dashboard' })}
                className="py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="mr-2"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"></path>
                </svg>
                Connect with google
              </button>
            </div>
            <div className="flex items-center justify-center mt-6">
              <a
                href="#"
                target="_blank"
                className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white">
                <span className="ml-2">Don&#x27;t have an account?</span>
              </a>
            </div>
          </div>
        </div>
      )}
      {session && (
        <div className="flex-column">
          <span className="flex py-2 text-center mr-3">Signed in as {session.user.name}</span>
          <button
            className="border-2 border-yellow-600 rounded-lg px-3 py-2 text-yellow-400 cursor-pointer hover:bg-yellow-600 hover:text-yellow-200"
            onClick={() => signOut({ callbackUrl: 'http://localhost:3000/login' })}>
            Sign Out <br />
          </button>
        </div>
      )}
    </div>
  )
}
