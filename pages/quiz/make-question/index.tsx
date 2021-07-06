import { Checkbox, FormLabel, useToast } from '@chakra-ui/react'
import { Field, FieldArray, Form, Formik } from 'formik'
import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'
import { GrFormNextLink } from 'react-icons/gr'
import { MdRemoveCircle } from 'react-icons/md'
import * as Yup from 'yup'
import Auth from '../../../components/common/Auth'
import SidebarLayout from '../../../components/layouts/SidebarLayout'
import CustomSingleSelect from '../../../components/forms/CustomSingleSelect'
import Required from '../../../components/forms/Required'
import { makeQuestion } from '../../../components/quiz/QuizAPI'
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

const QuestionForm = (): JSX.Element => {
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
  const toast = useToast()

  // Handle toast for answer (main field)
  const [answerError, setAnswerError] = useState('')
  function validateAnswer(answers): string {
    if (answers.filter((answer) => answer.main === '')[0]) {
      setAnswerError('Please fill in all the options')
    } else if (new Set(answers.map((answer) => answer.main)).size !== answers.length) {
      setAnswerError('Each option must be unique')
    } else {
      setAnswerError('')
    }
    return answerError
  }

  // Handle toast for answer (is_correct field)
  const [isCorrectError, setIsCorrectError] = useState('')
  function validateIsCorrect(answers): string {
    if (!answers.filter((answer) => answer.is_correct === true)[0]) {
      setIsCorrectError('Please select a correct option')
      console.log(isCorrectError)
    } else {
      setIsCorrectError('')
    }
    return isCorrectError
  }

  const handleSubmit = (value): void => {
    makeQuestion(value)
  }

  return (
    <>
      <Auth>
        <Head>
          <title>Make A Question | NUS Connect</title>
          <meta name="description" content="NUS Connect" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="dark:bg-gray-800 dark:text-gray-200">
          <SidebarLayout>
            {/* <Formik
              initialValues={initialValues}
              validationSchema={Yup.object({
                modules: Yup.array().required('Module is needed'),
                type: Yup.string().required('Please enter the type of question'),
                question: Yup.string().trim().required('Please fill out the question'),
                answers: Yup.array().min(2, 'Please make at least 2 answers'),
              })}
              onSubmit={(values, { setSubmitting }) => {
                if (answerError) {
                  showToast(answerError, 'mainAnswer-error')
                } else if (isCorrectError) {
                  showToast(isCorrectError, 'iscorrect-error')
                } else {
                  handleSubmit(values)
                  console.log(values)
                  setTimeout(() => {
                    toast({
                      title: 'Success!',
                      status: 'success',
                      duration: 5000,
                      isClosable: true,
                      position: 'top-right',
                    })
                    setSubmitting(false)
                  }, 400)
                }
              }}>
              {(formik) => (
                <section className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-600 dark:text-gray-200 w-full">
                  <Form className="px-4 md:px-6 pt-20">
                    <div className="flex justify-between text-gray-600 dark:text-gray-200">
                      <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
                        Make a question
                      </h1>
                      <Link href={'/quiz/make-quiz'}>
                        <span className="shadow-md p-2 cursor-pointer bg-white hover:bg-indigo-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-500 flex flex-row items-center w-auto">
                          <span className="items-center pr-1">
                            <GrFormNextLink />
                          </span>
                          <span>Done? Go make a quiz!</span>
                        </span>
                      </Link>
                    </div>
                    <div className="flex flex-col space-y-6 bg-white dark:bg-gray-800 mt-4">
                      <div className="flex flex-col w-full space-y-2">
                        <div className="flex space-x-2 items-end">
                          <div className="">Type of question</div>
                          {formik.errors.type && formik.touched.type ? <Required /> : null}
                        </div>
                        <Field
                          component={CustomSingleSelect}
                          name="type"
                          options={quizType}
                          className="max-w-md md:w-10/12 w-full"
                        />
                      </div>
                      <hr />
                      <div className="flex flex-col w-full space-y-2">
                        <div className="flex space-x-2 items-end">
                          <h2 className="">Question content</h2>
                          {formik.errors.question && formik.touched.question ? <Required /> : null}
                        </div>
                        <div className="w-full md:w-10/12">
                          <Field
                            as="textarea"
                            name="question"
                            rows={5}
                            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full px-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            placeholder="Question"></Field>
                        </div>
                      </div>
                      <hr />
                      <div className="flex flex-col w-full space-y-2">
                        <div className="flex space-x-2 items-end">
                          <h2 className="">Options (fill in at least 2)</h2>
                          {formik.errors.answers && formik.touched.answers ? <Required /> : null}
                        </div>
                        <div className="flex flex-col space-y-4 md:w-10/12">
                          <FieldArray name="answers">
                            {({ remove, push }) => (
                              <>
                                {formik.values.answers.length > 0 &&
                                  formik.values.answers.map((answer, index) => (
                                    <div className="my-2 flex flex-col items-center" key={index}>
                                      <div className="flex w-full items-center">
                                        <Field
                                          as="textarea"
                                          rows={4}
                                          className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                          name={`answers.${index}.main`}
                                          placeholder="Answer"
                                          validate={validateAnswer(formik.values.answers)}
                                        />
                                      </div>

                                      <div className="flex w-full justify-between">
                                        <div className="mt-1">
                                          <button
                                            type="button"
                                            className="secondary"
                                            onClick={() => remove(index)}>
                                            <div className="flex flex-row items-center text-gray-800 hover:text-red-700">
                                              <MdRemoveCircle className="mr-1" />
                                              Remove
                                            </div>
                                          </button>
                                        </div>
                                        <Field
                                          name={`answers.${index}.is_correct`}
                                          validate={validateIsCorrect(formik.values.answers)}>
                                          {({ field }) => (
                                            <div className="flex-row flex items-center">
                                              <FormLabel
                                                htmlFor={`answer.${index}.is_correct`}
                                                className="whitespace-nowrap content-center mt-1 ml-1">
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
                                  onClick={() => push({ main: '', is_correct: false })}>
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
                              showToast('Please make at least 2 answers', 'answer-error')
                            }
                          }}>
                          Save
                        </button>
                      </div>
                    </div>
                  </Form>
                </section>
              )}
            </Formik> */}
            <NewQuestion />
          </SidebarLayout>
        </div>
      </Auth>
    </>
  )
}
export default QuestionForm
