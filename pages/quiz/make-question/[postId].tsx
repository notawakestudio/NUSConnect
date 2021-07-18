import {
  Button,
  Checkbox,
  FormLabel,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  useToast,
} from '@chakra-ui/react'
import { Field, FieldArray, Form, Formik } from 'formik'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { GrFormNextLink } from 'react-icons/gr'
import * as Yup from 'yup'
import Auth from '../../../components/common/Auth'
import CustomSingleSelect from '../../../components/forms/CustomSingleSelect'
import Layout from '../../../components/layouts/Layout'
import PostMain from '../../../components/forum/PostMain'
import ReplyList from '../../../components/forum/ReplyList'
import { makeQuestion } from '../../../components/quiz/QuizAPI'
import Required from '../../../components/forms/Required'
import NewQuestion from '../../../components/quiz/NewQuestion'
const initialValues = {
  modules: ['CS2030', 'CS2030S'],
  type: '',
  question: '',
  answers: [
    {
      main: '',
      is_correct: false,
    },
  ],
}

const quizType = [
  { label: 'MCQ', value: 'MCQ' },
  { label: 'MRQ', value: 'MRQ' },
]

function validateAnswer(value) {
  let error
  if (value === '') {
    error = 'Please enter a value'
  }
  return error
}

const QuestionForm = (): JSX.Element => {
  const router = useRouter()
  const { postId } = router.query
  const errorToast = useToast()

  function showToast(error: string, id: string): void {
    if (!errorToast.isActive(id)) {
      errorToast({
        id: id,
        title: 'Error',
        description: error,
        status: 'error',
        duration: 5000,
        position: 'top-right',
        isClosable: true,
      })
    }
  }

  const handleSubmit = (value): void => {
    makeQuestion(value)
  }
  const [isOpen, setIsOpen] = useState(false)
  const open = (): void => setIsOpen(!isOpen)
  const close = (): void => setIsOpen(false)
  const toast = useToast()
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
