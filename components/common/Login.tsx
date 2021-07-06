import { signIn, signOut, useSession } from 'next-auth/client'
import { AiFillGithub, AiFillGoogleCircle } from 'react-icons/ai'

export default function Login(): JSX.Element {
  const [session] = useSession()
  return (
    <div className="container flex justify-center mx-auto">
      {!session && (
        <div>
          <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
            <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
              Login To Your Account
            </div>
            <div className="flex-column gap-4 item-center">
              <button
                type="button"
                onClick={() => signIn('github')}
                className="mb-3 py-2 px-4 flex justify-center items-center  bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                <AiFillGithub />
                <span className="ml-2">Connect with Github</span>
              </button>
              <button
                data-cy="googleLogin"
                type="button"
                onClick={() => signIn('google')}
                className="py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                <AiFillGoogleCircle />
                <span className="ml-2">Connect with Google</span>
              </button>
            </div>
            <div className="flex items-center justify-center mt-6">
              <a
                href="#"
                target="_blank"
                className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white">
                <span className="ml-2">
                  Don&#x27;t have an account?
                  <br /> Click on any of the above options
                  <br /> and you are good to go!
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
      {session && (
        <div className="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800 w-64 m-auto border">
          <div className="w-full h-full text-center font-semibold">
            <div className="flex h-full flex-col">
              <p className="text-gray-600 dark:text-gray-100 text-md py-2 px-6">
                You are logged in as {session.user.name}
              </p>
              <div className="flex items-center justify-center gap-4 w-full mt-4">
                <button
                  className="border-2 border-yellow-600 rounded-lg px-3 py-2 text-yellow-400 cursor-pointer hover:bg-yellow-600 hover:text-yellow-200"
                  onClick={() => signOut({ callbackUrl: `${process.env.NEXTAUTH_URL}/login` })}>
                  Confirm Logout <br />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
