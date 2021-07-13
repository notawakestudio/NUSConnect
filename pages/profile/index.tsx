import Head from 'next/head'
import ModuleCards from '../../components/profile/ModuleCards'
import ProfileHeader from '../../components/profile/ProfileHeader'

export default function Profile(): JSX.Element {
  return (
    <div className="dark:bg-gray-800 w-full min-h-screen">
      <Head>
        <title>Profile | NUS Connect</title>
        <meta name="description" content="NUS Connect" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col">
        <ProfileHeader />
        <ModuleCards />
      </div>
    </div>
  )
}
