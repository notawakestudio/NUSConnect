import { useToast } from '@chakra-ui/react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { nanoid } from 'nanoid'
import Head from 'next/head'
import * as Yup from 'yup'
import Layout from '../../components/layouts/Layout'
import { makeModule } from '../../components/module/ModuleAPI'
export default function Home(): JSX.Element {
  const initialValues = {
    title: 'CS2030',
    users: [
      {
        id: 'ddHg168Fwz9VIP1wxbzK',
        name: 'Dreamer',
        exp: 0,
        role: 'admin',
        badges: ['a', 'b'],
        completedTasks: [],
      },
    ],
    questions: [],
    quiz: [],
    forum: [],
    reply: [],
    tasks: [],
    schedule: [],
  }
  const handleSubmit = (value): void => {
    value.id = nanoid()
    console.log(value)
    makeModule(value)
  }
  const toast = useToast()
  return (
    <>
      <Head>
        <title>Create Module | NUS Connect</title>
        <meta name="description" content="NUS Connect" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            title: Yup.string().required('Required'),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleSubmit(values)
            setTimeout(() => {
              toast({
                title: 'Done!',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
              })
              setSubmitting(false)
              resetForm()
            }, 400)
          }}>
          {(formik) => (
            <section className="bg-gray-100 bg-opacity-20">
              <Form className="container max-w-3xl mx-auto shadow-md md:w-3/4">
                <div className="p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-lg bg-opacity-5">
                  <div className="max-w-sm mx-auto md:w-full md:mx-0">
                    <div className="inline-flex items-center space-x-4">
                      <h1 className="text-gray-600">Create a module</h1>
                    </div>
                  </div>
                </div>
                <div className="space-y-6 bg-white">
                  <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                    <h2 className="max-w-sm mx-auto md:w-2/12">Module Title</h2>
                    <div className="max-w-md mx-auto md:w-10/12">
                      <div className=" relative ">
                        <Field
                          name="title"
                          rows={5}
                          className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                          placeholder="title"></Field>
                        <ErrorMessage name="title" />
                      </div>
                    </div>
                  </div>
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
