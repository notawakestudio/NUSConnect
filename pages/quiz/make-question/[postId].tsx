import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { GrFormNextLink } from 'react-icons/gr'
import Auth from '../../../components/common/Auth'
import PostMain from '../../../components/forum/PostMain'
import ReplyList from '../../../components/forum/ReplyList'
import NewQuestion from '../../../components/quiz/NewQuestion'

const QuestionForm = (): JSX.Element => {
  const router = useRouter()
  const { postId } = router.query

  const [isOpen, setIsOpen] = useState(false)
  const open = (): void => setIsOpen(!isOpen)
  const close = (): void => setIsOpen(false)
  return (
    <>
      <Auth>
        <Head>
          <title>Make A Question | NUS Connect</title>
          <meta name="description" content="NUS Connect" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="dark:bg-gray-800 dark:text-gray-200 w-full">
          <div className="px-4 md:px-6 pt-20">
            <div className="flex justify-between text-gray-600 dark:text-gray-200 sm:flex-row flex-col">
              <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
                Make a question
              </h1>
              <span className="flex flex-row space-x-2">
                {postId ? (
                  <Popover
                    // placement="left-start"
                    // offset={[0, 400]}
                    isOpen={isOpen}
                    onClose={close}
                    returnFocusOnClose={false}
                    closeOnBlur={false}>
                    <Portal>
                      <PopoverContent style={{ width: '30rem' }}>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                          <PostMain postId={postId as string} />
                          <ReplyList postId={postId as string} />
                        </PopoverBody>
                      </PopoverContent>
                    </Portal>

                    <PopoverTrigger>
                      <Button
                        className="shadow-md p-2 cursor-pointer bg-white hover:bg-indigo-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-500 flex flex-row items-center w-auto"
                        onClick={open}>
                        Open Reference Post
                      </Button>
                    </PopoverTrigger>
                  </Popover>
                ) : null}
                <Link href={'/quiz/make-quiz'}>
                  <span className="shadow-md p-2 cursor-pointer bg-white hover:bg-indigo-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-500 flex flex-row items-center w-auto">
                    <span className="items-center pr-1">
                      <GrFormNextLink />
                    </span>
                    <span>Done? Go make a quiz!</span>
                  </span>
                </Link>
              </span>
            </div>
            <NewQuestion />
          </div>
        </div>
      </Auth>
    </>
  )
}
export default QuestionForm
