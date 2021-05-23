import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'

export default function Home(): JSX.Element {
  const [session, loading] = useSession()

  return (
    <div className="">
      <Head>
        <title>Login page</title>
        <meta name="login" content="login page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* for some reason there are errors here, it works but typescript does not like it  */}

      <main className="container mx-auto justify-content">
        {!session && (
          <>
            Not signed in <br />
            <button className="border-2 border-yellow-600 rounded-lg px-3 py-2 text-yellow-400 cursor-pointer hover:bg-yellow-600 hover:text-yellow-200" onClick={signIn}>
              {' '}
              Sign In{' '}
            </button>
          </>
        )}
        {session && (
          <>
            Signed in as {session.user.email} <br />
            <div>PAGE FOR PEOPLE WHO SIGN IN </div>
            <button>
              <Link href="/secret">To the secret</Link>
            </button>
            <button className="border-2 border-yellow-600 rounded-lg px-3 py-2 text-yellow-400 cursor-pointer hover:bg-yellow-600 hover:text-yellow-200" onClick={signOut}>
              {' '}
              Sign Out{' '}
            </button>
          </>
        )}
      </main>
    </div>
  )
}
