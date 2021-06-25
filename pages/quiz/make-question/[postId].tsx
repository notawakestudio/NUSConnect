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
import CustomSingleSelect from '../../../components/common/CustomSingleSelect'
import Layout from '../../../components/common/Layout'
import PostMain from '../../../components/forum/PostMain'
import ReplyList from '../../../components/forum/ReplyList'
import { makeQuestion } from '../../../components/quiz/QuizAPI'
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
        <div className="dark:bg-gray-800 dark:text-gray-200 ">
          <Layout>
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object({
                modules: Yup.array().required('Module is needed'),
                type: Yup.string().required('Please enter the type of question'),
                question: Yup.string().trim().required('Please fill out the question'),
                answers: Yup.array().min(2, 'Please make one question'),
              })}
              onSubmit={(values, { setSubmitting }) => {
                handleSubmit(values)
                console.log(values)
                setTimeout(() => {
                  // alert('DONE')
                  // alert(JSON.stringify(values, null, 2))
                  toast({
                    title: 'Success!',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'top-right',
                  })
                  setSubmitting(false)
                }, 400)
              }}>
              {(formik) => (
                <section className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-600 dark:text-gray-200">
                  <Form className="container max-w-3xl mx-auto shadow-md md:w-3/4">
                    <div className="p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-lg bg-opacity-5">
                      <div className="flex justify-between text-gray-600 dark:text-gray-200">
                        <h1 className="text-lg font-semibold">Make a question</h1>
                        <div className="font-semibold flex flex-col sm:flex-row items-center">
                          {postId ? (
                            <Popover
                              placement="left-start"
                              offset={[0, 400]}
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
                                  className="dark:bg-blue-500 dark:hover:bg-blue-700 mr-2 mb-2 sm:mb-0"
                                  onClick={open}>
                                  Open Reference Post
                                </Button>
                              </PopoverTrigger>
                            </Popover>
                          ) : null}

                          <Button className="dark:bg-blue-500 dark:hover:bg-blue-700">
                            <Link href="/quiz/make-quiz">Done? Go make a quiz!</Link>
                            <GrFormNextLink className="ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6 bg-white dark:bg-gray-800">
                      <div className="items-center w-full p-4 space-y-4  md:inline-flex md:space-y-0">
                        <h2 className="max-w-sm mx-auto md:w-2/12">Meta data</h2>
                        <div className="max-w-md mx-auto md:w-10/12">
                          <div className="">Type </div>
                          {formik.errors.type && formik.touched.type ? (
                            <div className="text-xs font-bold text-red-600">* required </div>
                          ) : null}
                          <Field component={CustomSingleSelect} name="type" options={quizType} />
                        </div>
                      </div>
                      <hr />
                      <div className="items-center w-full p-4 space-y-4 md:inline-flex md:space-y-0">
                        <h2 className="max-w-sm mx-auto md:w-2/12">Question</h2>
                        <div className="w-full mx-auto max-w-md md:w-10/12">
                          {formik.errors.question && formik.touched.question ? (
                            <div className="text-xs font-bold text-red-600">* required </div>
                          ) : null}
                          <Field
                            as="textarea"
                            name="question"
                            rows={5}
                            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full px-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            placeholder="Question"></Field>
                        </div>
                      </div>
                      <hr />
                      <div className="items-center w-full p-4 space-y-4 md:inline-flex md:space-y-0">
                        <h2 className="max-w-sm mx-auto md:w-2/12">Answers</h2>
                        <div className="flex flex-col max-w-md mx-auto space-y-4 md:w-10/12">
                          <FieldArray name="answers">
                            {({ remove, push }) => (
                              <>
                                {formik.values.answers.length > 0 &&
                                  formik.values.answers.map((answer, index) => (
                                    <div className="mb-4 flex flex-col items-center" key={index}>
                                      {formik.errors.answers && formik.touched.answers ? (
                                        <div className="self-start text-xs font-bold text-red-600">
                                          * required{' '}
                                        </div>
                                      ) : null}
                                      <div className="flex w-full items-center">
                                        <Field
                                          as="textarea"
                                          rows={4}
                                          className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                          name={`answers.${index}.main`}
                                          placeholder="This is a placeholder"
                                          validate={validateAnswer}
                                        />
                                        <div className="ml-2">
                                          <button
                                            type="button"
                                            className="secondary"
                                            onClick={() => remove(index)}>
                                            X
                                          </button>
                                        </div>
                                      </div>

                                      <div className="flex w-full justify-end px-4">
                                        <Field name={`answers.${index}.is_correct`}>
                                          {({ field }) => (
                                            <div className="flex-row flex items-center">
                                              <FormLabel
                                                htmlFor={`answer.${index}.is_correct`}
                                                className="whitespace-nowrap content-center pt-1 pl-1">
                                                Correct Answer
                                              </FormLabel>
                                              <Checkbox {...field} />
                                            </div>
                                          )}
                                        </Field>
                                      </div>
                                    </div>
                                  ))}
                                <button
                                  type="button"
                                  className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                  onClick={() => push('')}>
                                  Add More
                                </button>
                              </>
                            )}
                          </FieldArray>
                        </div>
                      </div>
                      <hr />
                      <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
                        <button
                          type="submit"
                          className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                          onClick={() => {
                            if (formik.errors.type && formik.touched.type) {
                              showToast(formik.errors.type, 'type-error')
                            }
                            if (formik.errors.question && formik.touched.question) {
                              showToast(formik.errors.question, 'question-error')
                            }
                            if (formik.errors.answers && formik.touched.answers) {
                              showToast(formik.errors.answers as string, 'answer-error')
                            }
                          }}>
                          Save
                        </button>
                      </div>
                    </div>
                  </Form>
                </section>
              )}
            </Formik>
          </Layout>
        </div>
      </Auth>
    </>
  )
}
export default QuestionForm
