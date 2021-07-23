import { Checkbox, FormLabel, useToast } from '@chakra-ui/react'
import { Field, FieldArray, Form, Formik } from 'formik'
import { nanoid } from 'nanoid'
import { useSession } from 'next-auth/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { GrFormNextLink } from 'react-icons/gr'
import { ImCancelCircle } from 'react-icons/im'
import { MdRemoveCircle } from 'react-icons/md'
import * as Yup from 'yup'
import CustomMultiSelect from '../forms/CustomMultiSelect'
import CustomSingleSelect from '../forms/CustomSingleSelect'
import Required from '../forms/Required'
import { TagMultiSelect } from '../forms/TagMultiSelect'
import { allAvailableTags } from '../forum/ForumAPI'
import { useUserId } from '../store/user'
import { makeQuestion, makeQuiz } from './QuizAPI'

const modules = ['CS2030', 'CS2030S']

const empty_question = {
  id: nanoid(),
  modules: modules,
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
  { label: 'WRITTEN', value: 'WRITTEN' },
]

const initialValues = {
  title: '',
  week: '',
  modules: modules,
  tags: [''],
  questions: [],
  new_questions: [],
}

export default function NewQuiz({
  questionList,
}: {
  questionList: { label: string; value: string }
}): JSX.Element {
  const [session] = useSession()
  const userId = useUserId()
  const handleSubmit = (value): void => {
    value.author = session.user?.name ? userId : 'Anonymous'
    value['new_questions'].forEach((q) => {
      makeQuestion(q)
    })
    makeQuiz(value)
  }

  //Toast when error occurs
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
  const router = useRouter()
  const tags = allAvailableTags.map((tag) => {
    return { value: tag, label: tag }
  })

  // Handle toast for answer (main field)
  const [answerError, setAnswerError] = useState('')
  function validateAnswer(answers, index): string {
    if (answers.filter((answer) => answer.main === '')[0]) {
      setAnswerError('Please fill in all the options in New Question #' + (index + 1).toString())
    } else if (new Set(answers.map((answer) => answer.main)).size !== answers.length) {
      setAnswerError('Each option must be unique in New Question #' + (index + 1))
    } else if (answers.length < 2) {
      setAnswerError('Please make at least 2 answers in New Question #' + (index + 1))
    } else {
      setAnswerError('')
    }
    return answerError
  }

  function validateWrittenAnswer(): string {
    setAnswerError('')
    return answerError
  }

  // Handle toast for answer (is_correct field)
  const [isCorrectError, setIsCorrectError] = useState('')
  function validateIsCorrect(answers, index): string {
    if (!answers.filter((answer) => answer.is_correct === true)[0]) {
      setIsCorrectError('Please select a correct option in New Question #' + (index + 1))
    } else {
      setIsCorrectError('')
    }
    return isCorrectError
  }

  function validateWrittenIsCorrect(answers): string {
    if (answers.filter((answer) => answer.is_correct === true)[0]) {
      setIsCorrectError('Something went wrong')
    } else {
      setIsCorrectError('')
    }
    return isCorrectError
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        modules: Yup.array().required('Required'),
        title: Yup.string().required('Please name your quiz'),
        week: Yup.string().required('Please enter current week'),
        tags: Yup.array().min(1, 'Please select one tag'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        if (answerError) {
          showToast(answerError, 'answer-error')
        } else if (isCorrectError) {
          showToast(isCorrectError, 'isCorrect-error')
        } else {
          values['questions'].push(
            ...values['new_questions']
              .filter((question) => question['question'] !== '')
              .map((question) => question.id as string)
          )
          if (values['questions'].length < 1) {
            showToast('Please add at least one question', 'question-error')
          } else {
            handleSubmit(values)
            setTimeout(() => {
              toast({
                title: 'Success! Redirecting back to the quiz list...',
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
                onCloseComplete: () => {
                  router.push('/quiz')
                },
              })
              setSubmitting(false)
            }, 400)
          }
        }
      }}>
      {(formik) => (
        <section className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-600 dark:text-gray-200 w-full">
          <Form className="px-4 md:px-6 pt-20">
            <div className="flex justify-between text-gray-600 dark:text-gray-200">
              <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">Make a quiz</h1>
              <Link href={'/quiz/make-question'}>
                <span className="shadow-md p-2 cursor-pointer bg-white hover:bg-indigo-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-500 flex flex-row items-center w-auto">
                  <span className="items-center pr-1">
                    <GrFormNextLink />
                  </span>
                  <span>Done? Go make a question!</span>
                </span>
              </Link>
            </div>
            <div className="flex flex-col space-y-6 bg-white dark:bg-gray-800 mt-4">
              <div className="flex flex-col w-full md:w-10/12 space-y-2">
                <div className="flex space-x-2 items-end">
                  <div>Title</div>
                  {formik.errors.title && formik.touched.title ? <Required /> : null}
                </div>
                <Field
                  name="title"
                  rows={5}
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="title"></Field>
              </div>
              <div className="flex flex-col w-full md:w-10/12 space-y-2">
                <div className="flex space-x-2 items-end">
                  <div>Week</div>
                  {formik.errors.week && formik.touched.week ? <Required /> : null}
                </div>
                <Field
                  name="week"
                  type="number"
                  min={0}
                  max={13}
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="week"></Field>
              </div>
              <div className="flex flex-col w-full md:w-10/12 space-y-2">
                <div className="flex space-x-2 items-end">
                  <span>Tags</span>
                  {formik.errors.tags && formik.touched.tags ? <Required /> : null}
                </div>
                <Field name={'tags'} component={TagMultiSelect} options={tags} />
              </div>
              <div className="flex flex-col w-full space-y-2 md:w-10/12">
                <div className="flex space-x-2 items-end">
                  <div className="text-2xl font-semibold">Select pre-made questions</div>
                  {formik.errors.questions && formik.touched.questions ? <Required /> : null}
                </div>
                <div className="w-full">
                  <Field component={CustomMultiSelect} name="questions" options={questionList} />
                </div>
              </div>
              <div className="text-2xl font-semibold">Create questions (optional)</div>
              <FieldArray name="new_questions">
                {({ remove, push }) => (
                  <div className="flex flex-col space-y-4">
                    {formik.values.new_questions.length > 0 &&
                      formik.values.new_questions.map((question, index) => (
                        <div key={index}>
                          <div className="flex flex-col space-y-4 p-4 border border-blue-200 bg-gray-100 dark:bg-gray-700">
                            <div className="flex flex-row justify-between items-center">
                              <h2 className="font-lg font-bold">New Question #{index + 1}</h2>
                              <button
                                type="button"
                                className="secondary"
                                onClick={() => remove(index)}>
                                <div className="flex flex-row items-center text-red-500 hover:text-red-700 dark:text-gray-300 dark:hover:text-red-500">
                                  <ImCancelCircle className="mr-1 mt-1" />
                                  Delete question
                                </div>
                              </button>
                            </div>
                            <div className="flex space-x-2 items-end">
                              <h2 className="">Question Type</h2>
                            </div>
                            <Field
                              component={CustomSingleSelect}
                              name={`new_questions.${index}.type`}
                              options={quizType}
                              className="max-w-md"></Field>
                            <div className="flex space-x-2 items-end">
                              <h2 className="">Question content</h2>
                            </div>
                            <Field
                              rows={5}
                              name={`new_questions.${index}.question`}
                              className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                              placeholder="Question"
                              type="text"></Field>
                            {formik.values.new_questions[index].type === 'WRITTEN' ? (
                              <>
                                <div className="flex space-x-2 items-end">
                                  <h2 className="">Answer (optional)</h2>
                                </div>
                                <Field
                                  name={`new_questions.${index}.answers.0.main`}
                                  placeholder="Answer (optional)"
                                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                  type="text"
                                  row={4}
                                  validate={validateWrittenAnswer()}></Field>
                                <Field
                                  name={`new_questions.${index}.answers.0.is_correct`}
                                  validate={validateWrittenIsCorrect(
                                    formik.values.new_questions[index].answers
                                  )}>
                                  {({ field }) => (
                                    <div className="flex-row items-center hidden">
                                      <FormLabel
                                        htmlFor={`answer.0.is_correct`}
                                        className="whitespace-nowrap content-center mt-1 ml-1">
                                        Correct Answer
                                      </FormLabel>
                                      <Checkbox {...field} defaultValue={true} />
                                    </div>
                                  )}
                                </Field>
                              </>
                            ) : (
                              <>
                                <div className="flex space-x-2 items-end">
                                  <h2 className="">Options (fill in at least 2)</h2>
                                </div>
                                <FieldArray name={`new_questions.${index}.answers`}>
                                  {({ remove, push }) => (
                                    <div>
                                      {formik.values.new_questions[index].answers.length > 0 &&
                                        formik.values.new_questions[index].answers.map(
                                          (answer, inner_index) => (
                                            <div key={inner_index}>
                                              <Field
                                                name={`new_questions.${index}.answers.${inner_index}.main`}
                                                placeholder="Answer"
                                                className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                type="text"
                                                validate={validateAnswer(
                                                  formik.values.new_questions[index].answers,
                                                  index
                                                )}></Field>
                                              <div className="flex w-full justify-between">
                                                <div className="mt-1">
                                                  <button
                                                    type="button"
                                                    className="secondary"
                                                    onClick={() => remove(inner_index)}>
                                                    <div className="flex flex-row items-center text-gray-800 hover:text-red-700 dark:text-gray-300 dark:hover:text-red-500 ">
                                                      <MdRemoveCircle className="mr-1 mt-1" />
                                                      Remove
                                                    </div>
                                                  </button>
                                                </div>
                                                <Field
                                                  name={`new_questions.${index}.answers.${inner_index}.is_correct`}
                                                  validate={validateIsCorrect(
                                                    formik.values.new_questions[index].answers,
                                                    index
                                                  )}>
                                                  {({ field }) => (
                                                    <div className="flex-row flex items-center">
                                                      <FormLabel
                                                        htmlFor={`new_questions.${index}.answers.${inner_index}.is_correct`}
                                                        className="whitespace-nowrap content-center mt-1 ml-1">
                                                        Correct Answer
                                                      </FormLabel>
                                                      <Checkbox {...field} />
                                                    </div>
                                                  )}
                                                </Field>
                                              </div>
                                            </div>
                                          )
                                        )}
                                      <button
                                        type="button"
                                        onClick={() => push({ main: '', is_correct: false })}
                                        className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-1/3 sm:w-1/5 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                                        Add New Option
                                      </button>
                                    </div>
                                  )}
                                </FieldArray>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    <button
                      type="button"
                      className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-1/2 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                      onClick={() => push(empty_question)}>
                      Add New Question
                    </button>
                  </div>
                )}
              </FieldArray>

              <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
                <button
                  type="submit"
                  className="py-2 px-4  bg-green-500 hover:bg-green-600 focus:ring-green-400 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  onClick={() => {
                    if (formik.touched.title && formik.errors.title) {
                      showToast(formik.errors.title, 'title-error')
                    }
                    if (formik.touched.week && formik.errors.week) {
                      showToast(formik.errors.week, 'week-error')
                    }
                    if (formik.touched.questions && formik.errors.questions) {
                      showToast(formik.errors.questions as string, 'question-error')
                    }
                    if (formik.touched.tags && formik.errors.tags) {
                      showToast(formik.errors.tags as string, 'tag-error')
                    }
                  }}>
                  Create Quiz
                </button>
              </div>
            </div>
          </Form>
        </section>
      )}
    </Formik>
  )
}
