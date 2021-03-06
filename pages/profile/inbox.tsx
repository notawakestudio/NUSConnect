import Head from 'next/head'
import MessageSection from '../../components/inbox/MessageSection'
import { useUserInbox } from '../../components/profile/UserAPI'
import { useUserId } from '../../components/store/user'
import { Skeleton } from '@chakra-ui/skeleton'
export default function Inbox(): JSX.Element {
  const userId = useUserId()
  const { inbox, isLoading } = useUserInbox(userId)
  return (
    <>
      <Head>
        <title>Inbox | NUS Connect</title>
        <meta name="description" content="NUS Connect" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="dark:bg-gray-800 flex flex-col w-full min-h-screen">
        <section className="dark:text-white text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="-my-8 divide-y-2 divide-gray-100">
              {isLoading ? (
                <Skeleton height="40px" />
              ) : (
                inbox.map((message) => {
                  return <MessageSection key={message.id} message={message} />
                })
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
