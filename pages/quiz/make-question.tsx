import { Checkbox, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import * as Yup from 'yup'
import Layout from '../../components/common/Layout'
import TextContainer from '../../components/common/TextContainer'
import { makeQuestion } from '../../components/quiz/QuizAPI'
import CustomSingleSelect from '../../components/common/CustomSingleSelect'
import { FcAnswers } from 'react-icons/fc'

const initialValues = {
  modules: ['CS2030', 'CS2030S'],
  type: '',
  question:
    'Which of the following statements about good OO programming practice is LEAST appropriate?',
  answers: [
    {
      main: 'We should use Inheritance to reduce duplication of code between two classes as much as possible',
      is_correct: true,
    },
    {
      main: 'We should declare fields as private as much as possible',
      is_correct: false,
    },
    {
      main: 'We should not throw exceptions that reveal internal implementation of a class as much as possible',
      is_correct: false,
    },
    {
      main: 'We should avoid using accessors and mutators (also known as getters and setters) to private fields as much as possible',
      is_correct: false,
    },
    {
      main: 'We should use polymorphism so that each class is responsible for handling its own behavior as much as possible',
      is_correct: false,
    },
  ],
}

const quizType = [
  { label: 'MCQ', value: 'MCQ' },
  { label: 'MRQ', value: 'MRQ' },
]

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
            // answers: Yup.array().min(2).of(Yup.string().required()),
          })}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values)
            console.log(values)
            setTimeout(() => {
              alert('DONE')
              alert(JSON.stringify(values, null, 2))
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
                      <Field component={CustomSingleSelect} name="type" options={quizType} />
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
                    <h2 className="max-w-sm mx-auto md:w-2/12">Answers</h2>
                    <div className="flex flex-col max-w-md mx-auto space-y-4 md:w-10/12">
                      <FieldArray name="answers">
                        {({ insert, remove, push }) => (
                          <div>
                            {formik.values.answers.length > 0 &&
                              formik.values.answers.map((answer, index) => (
                                <div className="mb-4" key={index}>
                                  <TextContainer>
                                    <div className="flex flex-col items-center p-2">
                                      <div className="flex w-full items-center">
                                        <div className="col w-full">
                                          <Field
                                            as="textarea"
                                            rows={4}
                                            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                            name={`answers.${index}.main`}
                                            placeholder="This is a placeholder"
                                          />
                                          <ErrorMessage
                                            name={`answers.${index}.main`}
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
                                      <div className="flex w-full justify-end">
                                        <div className="mx-4">
                                          <Field name={`answers.${index}.is_correct`}>
                                            {({ field, form }) => (
                                              <FormControl
                                                isInvalid={form.errors.name && form.touched.name}>
                                                <div className="flex-row flex items-center">
                                                  <FormLabel
                                                    htmlFor="is_correct"
                                                    className="whitespace-nowrap content-center pt-1 pl-1">
                                                    Correct Answer
                                                  </FormLabel>
                                                  <Checkbox {...field} id={answer.main} />
                                                  <FormErrorMessage>
                                                    {form.errors.name}
                                                  </FormErrorMessage>
                                                </div>
                                              </FormControl>
                                            )}
                                          </Field>
                                          <ErrorMessage
                                            name={`answers.${index}.main`}
                                            component="div"
                                            className="field-error"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </TextContainer>
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
