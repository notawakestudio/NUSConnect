import React from 'react'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import { makeQuestion } from '../../components/quiz/QuizAPI'
import Head from 'next/head'
import Layout from '../../components/common/Layout'
import Link from 'next/link'

const initialValues = {
  modules: ['CS2030', 'CS2030S'],
  type: 'MCQ',
  question:
    'Which of the following statements about good OO programming practice is LEAST appropriate?',
  correct_answers: [
    'We should use Inheritance to reduce duplication of code between two classes as much as possible',
  ],
  incorrect_answers: [
    'We should declare fields as private as much as possible',
    'We should not throw exceptions that reveal internal implementation of a class as much as possible',
    'We should avoid using accessors and mutators (also known as getters and setters) to private fields as much as possible',
    'We should use polymorphism so that each class is responsible for handling its own behavior as much as possible',
    'None of the others',
  ],
}

const QuestionForm = (): JSX.Element => {
  const handleSubmit = (value): void => {
    makeQuestion(value)
  }
  return (
    <>
      <Head>
        <title>Make A Question | NUS Connect</title>
        <meta name="description" content="NUS Connect" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex justify-center mx-auto">
          <Link href="/quiz/make-quiz">Done? Go make a quiz</Link>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            modules: Yup.array().required('Required'),
            type: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
            question: Yup.string().trim().required('Required'),
            correct_answers: Yup.array().min(1, 'Must have at least one').of(Yup.string().required()),
            incorrect_answers: Yup.array().min(1).of(Yup.string().required())
          })}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values)
            setTimeout(() => {
              alert("DONE")
              // alert(JSON.stringify(values, null, 2))
              setSubmitting(false)
            }, 400)
          }}>
          {(formik) => (
            <section className="bg-gray-100 bg-opacity-50">
              <Form className="container max-w-3xl mx-auto shadow-md md:w-3/4">
                <div className="p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-lg bg-opacity-5">
                  <div className="max-w-sm mx-auto md:w-full md:mx-0">
                    <div className="inline-flex items-center space-x-4">
                      <h1 className="text-gray-600">Make a question</h1>
                    </div>
                  </div>
                </div>
                <div className="space-y-6 bg-white">
                  <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                    <h2 className="max-w-sm mx-auto md:w-2/12">Meta data</h2>
                    <div className="max-w-md mx-auto md:w-10/12">
                      <div className=" relative ">
                        <label htmlFor="type">Type</label>
                        <div role="group" aria-labelledby="my-radio-group" className="flex">
                          <label htmlFor="type" className="mr-2">
                            <Field type="radio" name="type" value="MCQ" />
                            MCQ
                          </label>
                          <label htmlFor="type">
                            <Field type="radio" name="type" value="MRQ" />
                            MRQ
                          </label>
                          <div className="pl-2">Picked: {formik.values.type}</div>
                        </div>
                        <ErrorMessage name="type" />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="items-center w-full p-8 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                    <h2 className="max-w-sm mx-auto md:w-2/12">Question</h2>
                    <div className="w-full pl-2 mx-auto space-y-5 max-w-md md:w-10/12">
                      <div className=" relative ">
                        <Field
                          as="textarea"
                          name="question"
                          rows={5}
                          className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                          placeholder="Question"></Field>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                    <h2 className="max-w-sm mx-auto md:w-2/12">Correct Answer(s)</h2>
                    <div className="max-w-md mx-auto space-y-5 md:w-10/12">
                      <FieldArray name="correct_answers">
                        {({ remove, push }) => (
                          <div>
                            {formik.values.correct_answers.length > 0 &&
                              formik.values.correct_answers.map((correct_answer, index) => (
                                <div className="flex items-center my-2" key={index}>
                                  <div className="col w-full">
                                    <Field
                                      as="textarea"
                                      rows={4}
                                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                      name={`correct_answers.${index}`}
                                      placeholder="This is a misleading answer"
                                    />
                                    <ErrorMessage
                                      name={`correct_answers.${index}`}
                                      component="div"
                                      className="field-error"
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
                    <hr />
                  </div>
                  <hr />
                  <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                    <h2 className="max-w-sm mx-auto md:w-2/12">Incorrect Answers</h2>
                    <div className="max-w-md mx-auto space-y-5 md:w-10/12">
                      <FieldArray name="incorrect_answers">
                        {({ remove, push }) => (
                          <div>
                            {formik.values.incorrect_answers.length > 0 &&
                              formik.values.incorrect_answers.map((incorrect_answer, index) => (
                                <div className="flex items-center my-2" key={index}>
                                  <div className="col w-full">
                                    <Field
                                      as="textarea"
                                      rows={4}
                                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                      name={`incorrect_answers.${index}`}
                                      placeholder="This is a misleading answer"
                                    />
                                    <ErrorMessage
                                      name={`incorrect_answers.${index}`}
                                      component="div"
                                      className="field-error"
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
                  <hr />
                  <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
                    <button
                      type="submit"
                      className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                      Save
                    </button>
                  </div>
                </div>
              </Form>
            </section>
          )}
        </Formik>
      </Layout>
    </>
  )
}
export default QuestionForm
