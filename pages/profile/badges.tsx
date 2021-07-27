import Head from 'next/head'
import Badges from '../../components/profile/Badges'
import { useUser } from '../../components/profile/UserAPI'

export default function Badge(): JSX.Element {
  const { user, isLoading } = useUser()
  return (
    <>
      <Head>
        <title>Badges | NUS Connect</title>
        <meta name="description" content="NUS Connect" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full min-h-screen dark:bg-gray-800">
        <Badges user={user} isLoading={isLoading} />
      </div>
    </>
  )
}
