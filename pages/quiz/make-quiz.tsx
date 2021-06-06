import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import Head from 'next/head'
import Layout from '../../components/common/Layout'
import Link from 'next/link'
import { fetchAllQuestions, makeQuiz } from '../../components/quiz/QuizAPI'
import { useSession } from 'next-auth/client'
import CustomMultiSelect from '../../components/common/CustomMultiSelect'
import { GetStaticProps } from 'next'
import { renderMdToHtml } from '../../components/common/Util'

export const getStaticProps: GetStaticProps = async () => {
  const questions = await fetchAllQuestions()
  const selectObjects = questions.map((question) => {
    return { label: renderMdToHtml(question['question']), value: question['id'] }
  })
  return {
    props: {
      selectObjects,
    },
  }
}

const initialValues = {
  title: 'CS2030 Quiz 1',
  week: '1',
  modules: ['CS2030', 'CS2030S'],
  tags: ['OOP', 'intro'],
  questions: ['3zCJecvK8nCUM06cjxQ_Z', 'BZRCIwXBleMwXzi_VximL'],
}
const QuizForm = ({
  selectObjects,
}: {
  selectObjects: { label: string; value: string }
}): JSX.Element => {
  const [session] = useSession()
  const handleSubmit = (value): void => {
    value.author = session.user?.name ? session.user.name : 'Anonymous'
    makeQuiz(value)
  }
  return (
    <>
      <Head>
        <title>Make A Quiz | NUS Connect</title>
        <meta name="description" content="NUS Connect" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex justify-center mx-auto">
          <Link href="/quiz/make-question">Go make more questions</Link>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            modules: Yup.array().required('Required'),
            title: Yup.string().required('Required'),
            questions: Yup.array().required('Required'),
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
            <section className="bg-gray-100 bg-opacity-20">
              <Form className="container max-w-3xl mx-auto shadow-md md:w-3/4">
                <div className="p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-lg bg-opacity-5">
                  <div className="max-w-sm mx-auto md:w-full md:mx-0">
                    <div className="inline-flex items-center space-x-4">
                      <h1 className="text-gray-600">Make a quiz</h1>
                    </div>
                  </div>
                </div>
                <div className="space-y-6 bg-white">
                  <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                    <h2 className="max-w-sm mx-auto md:w-2/12">Meta data</h2>
                    <div className="max-w-md mx-auto md:w-10/12">
                      <div className=" relative ">
                        <label htmlFor="title">Title</label>
                        <Field
                          name="title"
                          rows={5}
                          className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                          placeholder="title"></Field>
                        <ErrorMessage name="title" />
                        <hr />
                        <label htmlFor="week">Week</label>
                        <Field
                          name="week"
                          type="number"
                          min={0}
                          max={13}
                          className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                          placeholder="week"></Field>
                        <ErrorMessage name="title" />
                        <hr />
                        <label htmlFor="tags">Tags</label>
                        <FieldArray name="tags">
                          {({ remove, push }) => (
                            <div>
                              {formik.values.tags.length > 0 &&
                                formik.values.tags.map((tag, index) => (
                                  <div className="flex items-center my-2" key={index}>
                                    <div className="col w-full">
                                      <Field
                                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                        name={`tags.${index}`}
                                      />
                                      <ErrorMessage name={`tags.${index}`} component="div" />
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
                      <Field
                        component={CustomMultiSelect}
                        name="questions"
                        options={selectObjects}
                      />
                    </div>
                    <hr />
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
export default QuizForm
