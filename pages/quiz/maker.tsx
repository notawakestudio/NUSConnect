import React from 'react'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'

const SignupForm = () => {
  return (
    <Formik
      initialValues={{ title: '', type: '', modules: '', incorrect_answers: [] }}
      validationSchema={Yup.object({
        title: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
        type: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 400)
      }}>
      {(formik) => (
        <section className="h-screen bg-gray-100 bg-opacity-50">
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
                <h2 className="max-w-sm mx-auto md:w-1/3">Meta data</h2>
                <div className="max-w-sm mx-auto md:w-2/3">
                  <div className=" relative ">
                    <label htmlFor="title">A Readable Title</label>
                    <Field
                      name="title"
                      type="text"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="title"
                    />
                    <ErrorMessage name="title" />
                    <hr />
                    <label htmlFor="title">Question Type</label>
                    <Field
                      name="type"
                      type="text"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                    <ErrorMessage name="type" />
                    <hr />
                    <label htmlFor="modules">Modules</label>
                    <Field
                      name="modules"
                      type="text"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                    <ErrorMessage name="modules" />
                  </div>
                </div>
              </div>
              <hr />
              <div className="items-center w-full p-8 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                <h2 className="max-w-sm mx-auto md:w-4/12">Question</h2>
                <div className="w-full pl-2 mx-auto space-y-5 max-w-sm md:w-2/3">
                  <div className=" relative ">
                    <textarea
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Question"></textarea>
                  </div>
                </div>
              </div>
              <hr />
              <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                <h2 className="max-w-sm mx-auto md:w-1/3">Correct Answers</h2>
                <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                  <div>
                    <div className=" relative ">
                      <Field
                        type="text"
                        name="correct_answers"
                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Option 1"
                      />
                    </div>
                  </div>
                  <div>
                    <div className=" relative ">
                      <input
                        type="text"
                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Option 2"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                <h2 className="max-w-sm mx-auto md:w-1/3">Incorrect Answers</h2>
                <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                  <FieldArray name="incorrect_answers">
                    {({ insert, remove, push }) => (
                      <div>
                        {formik.values.incorrect_answers.length > 0 &&
                          formik.values.incorrect_answers.map((incorrect_answer, index) => (
                            <div className="relative" key={index}>
                              <div className="col">
                                <Field
                                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                  name={`incorrect_answers.${index}.text`}
                                  placeholder="This is a misleading answer"
                                  type="text"
                                />
                                <ErrorMessage
                                  name={`incorrect_answers.${index}.text`}
                                  component="div"
                                  className="field-error"
                                />
                              </div>
                              <div className="col">
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
  )
}
export default SignupForm
