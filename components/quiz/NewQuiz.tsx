import { useToast } from '@chakra-ui/react'
import { Field, FieldArray, Form, Formik } from 'formik'
import { useSession } from 'next-auth/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { GrFormNextLink } from 'react-icons/gr'
import * as Yup from 'yup'
import CustomMultiSelect from '../forms/CustomMultiSelect'
import Required from '../forms/Required'
import { TagMultiSelect } from '../forms/TagMultiSelect'
import { allAvailableTags } from '../forum/ForumAPI'
import { useUserId } from '../store/user'
import NewQuestion from './NewQuestion'
import { makeQuiz } from './QuizAPI'

const initialValues = {
  title: '',
  week: '',
  modules: ['CS2030', 'CS2030S'],
  tags: [''],
  questions: [],
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
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        modules: Yup.array().required('Required'),
        title: Yup.string().required('Please name your quiz'),
        week: Yup.string().required('Please enter current week'),
        questions: Yup.array().min(1, 'Please select one question'),
        tags: Yup.array().min(1, 'Please select one tag'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values)
        setTimeout(() => {
          // alert(JSON.stringify(values, null, 2))
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
              <hr />
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
                  place
                  holder="week"></Field>
              </div>
              <hr />
              <div className="flex flex-col w-full md:w-10/12 space-y-2">
                <div className="flex space-x-2 items-end">
                  <span>Tags</span>
                  {formik.errors.tags && formik.touched.tags ? <Required /> : null}
                </div>
                <Field name={'tags'} component={TagMultiSelect} options={tags} />
              </div>
              <hr />
              <div className="flex flex-col w-full space-y-2 md:w-10/12">
                <div className="flex space-x-2 items-end">
                  <div className="">Questions</div>
                  {formik.errors.questions && formik.touched.questions ? <Required /> : null}
                </div>
                <div className="w-full">
                  <Field component={CustomMultiSelect} name="questions" options={questionList} />
                </div>
              </div>
              <hr />

              <FieldArray name="answers">
                {({ remove, push }) => (
                  <>
                    <NewQuestion></NewQuestion>
                    <button
                      type="button"
                      className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                      onClick={() => push('')}>
                      Add More
                    </button>
                  </>
                )}
              </FieldArray>

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
                    if (formik.touched.tags && formik.errors.tags) {
                      showToast(formik.errors.tags as string, 'tag-error')
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
  )
}
