import { Button, useToast } from '@chakra-ui/react'
import { Field, FieldArray, Form, Formik } from 'formik'
import { GetStaticProps } from 'next'
import { useSession } from 'next-auth/client'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { GrFormNextLink } from 'react-icons/gr'
import * as Yup from 'yup'
import Auth from '../../components/common/Auth'
import CustomMultiSelect from '../../components/common/CustomMultiSelect'
import Layout from '../../components/common/Layout'
import { renderMdToHtml } from '../../components/common/Util'
import { fetchAllQuestions, makeQuiz } from '../../components/quiz/QuizAPI'

export const getStaticProps: GetStaticProps = async () => {
  const questions = await fetchAllQuestions()
  const questionList = questions.map((question) => {
    return { label: renderMdToHtml(question['question']), value: question['id'] }
  })
  return {
    props: {
      questionList,
    },
  }
}

const initialValues = {
  title: '',
  week: '',
  modules: ['CS2030', 'CS2030S'],
  tags: [''],
  questions: [],
}

const QuizForm = ({
  questionList,
}: {
  questionList: { label: string; value: string }
}): JSX.Element => {
  const [session] = useSession()

  const handleSubmit = (value): void => {
    value.author = session.user?.name ? session.user.name : 'Anonymous'
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

  return (
    <>
      <Auth>
        <Head>
          <title>Make A Quiz | NUS Connect</title>
          <meta name="description" content="NUS Connect" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="dark:bg-gray-800 dark:text-gray-200">
          <Layout>
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object({
                modules: Yup.array().required('Required'),
                title: Yup.string().required('Please name your quiz'),
                week: Yup.string().required('Please enter current week'),
                questions: Yup.array().min(1, 'Please select one question'),
              })}
              onSubmit={(values, { setSubmitting }) => {
                handleSubmit(values)
                setTimeout(() => {
                  // alert(JSON.stringify(values, null, 2))
                  alert('DONE')
                  setSubmitting(false)
                }, 400)
              }}>
              {(formik) => (
                <section className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-600 dark:text-gray-200">
                  <Form className="container max-w-3xl mx-auto shadow-md md:w-3/4">
                    <div className="p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-lg bg-opacity-5">
                      <div className="flex justify-between text-gray-600 dark:text-gray-200">
                        <h1 className="text-lg font-semibold">Make a quiz</h1>
                        <h1 className="text-lg font-semibold flex items-center">
                          <Button className="dark:bg-blue-500 dark:hover:bg-blue-700">
                            <Link href="/quiz/make-question">Done? Make a question!</Link>
                            <GrFormNextLink className="ml-1" />
                          </Button>
                        </h1>
                      </div>
                    </div>
                    <div className="space-y-6 bg-white dark:bg-gray-800">
                      <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                        <h2 className="max-w-sm mx-auto md:w-2/12">Meta data</h2>
                        <div className="max-w-md mx-auto md:w-10/12">
                          <div className=" relative ">
                            <label htmlFor="title">Title</label>
                            {formik.errors.title && formik.touched.title ? (
                              <div className="text-xs font-bold text-red-600">* required </div>
                            ) : null}
                            <Field
                              name="title"
                              rows={5}
                              className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                              placeholder="title"></Field>
                            <label htmlFor="week">Week</label>
                            {formik.errors.week && formik.touched.week ? (
                              <div className="text-xs font-bold text-red-600">* required </div>
                            ) : null}
                            <Field
                              name="week"
                              type="number"
                              min={0}
                              max={13}
                              className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                              placeholder="week"></Field>
                            <label htmlFor="tags">Tags</label>
                            <FieldArray name="tags">
                              {({ remove, push }) => (
                                <div>
                                  {formik.values.tags.length > 0 &&
                                    formik.values.tags.map((tag, index) => (
                                      <div className="flex items-center my-2" key={index}>
                                        <div className="col w-full">
                                          <Field
                                            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                            name={`tags.${index}`}
                                          />
                                        </div>
                                        <div className="col ml-2">
                                          <button
                                            type="button"
                                            className="secondary"
                                            onClick={() => remove(index)}>
                                            X
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  <button
                                    type="button"
                                    className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                    onClick={() => push('')}>
                                    Add More
                                  </button>
                                </div>
                              )}
                            </FieldArray>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                        <h2 className="max-w-sm mx-auto md:w-2/12">Questions</h2>
                        <div className="max-w-md mx-auto space-y-5 md:w-10/12">
                          {formik.errors.questions && formik.touched.questions ? (
                            <div className="text-xs font-bold text-red-600">* required </div>
                          ) : null}
                          <Field
                            component={CustomMultiSelect}
                            name="questions"
                            options={questionList}
                          />
                        </div>
                      </div>
                      <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
                        <button
                          type="submit"
                          className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
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
export default QuizForm
