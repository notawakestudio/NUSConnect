import { useToast } from '@chakra-ui/react'
import { Field, Form, Formik, useField } from 'formik'
import { nanoid } from 'nanoid'
import { useSession } from 'next-auth/client'
import React from 'react'
import * as Yup from 'yup'
import Auth from '../common/Auth'
import { Quest, makeQuest, updateQuest } from './DashboardAPI'

const defaultQuest = {
  id: nanoid(),
  description: '',
  type: '',
  count: 0,
  link: '',
  created_date: 0,
  end_date: 0,
  reward: {
    exp: 10,
    badge: '',
  },
}

export default function NewQuest({
  label = 'Create Quest',
  currentQuest = defaultQuest,
  setEditing = function (bool) {},
}: {
  label?: string
  currentQuest?: Quest
  setEditing?: (bool: boolean) => void
}): JSX.Element {
  //Initalizing values
  const initialValues = {
    description: currentQuest.description,
    type: currentQuest.type,
    exp: currentQuest.reward.exp,
    count: currentQuest.count,
    end_date: currentQuest.end_date,
  }

  //User Session
  const [session] = useSession()

  //Handling Quest request
  const handleSubmitNew = (value): void => {
    value.author = session.user?.name ? session.user.name : 'Anonymous'
    makeQuest(value)
  }
  const handleSubmitUpdate = (value): void => {
    updateQuest(value, currentQuest)
  }

  //Toast
  const toast = useToast()
  function showToast(error: string, id: string): void {
    if (!toast.isActive(id)) {
      toast({
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
    <Auth>
      <div
        className="bg-white overflow-hidden shadow-md rounded-lg dark:bg-gray-800 dark:text-gray-200"
        data-cy="newQuestForm">
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            description: Yup.string().required('Please enter a description'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            if (label === 'Make an Quest') {
              handleSubmitNew(values)
            } else {
              handleSubmitUpdate(values)
              setEditing(false)
            }
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
          }}>
          {(formik) => (
            <section className="bg-indigo-200 dark:bg-gray-800 dark:text-gray-200 ">
              <Form>
                <div className="p-4 bg-indigo-100 shadow-lg dark:bg-gray-600">
                  <div className="max-w-sm mx-auto md:w-full md:mx-0">
                    <div className="inline-flex items-center space-x-4">
                      <h1 className="dark:text-gray-200 text-lg font-semibold">
                        {label === 'Make an Quest' ? label : 'Edit an Quest'}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 bg-white dark:bg-gray-700 dark:text-gray-200">
                  <div className="items-center w-full p-4 text-gray-500 dark:text-gray-300 flex-shrink-0 flex-col">
                    <label htmlFor="description">Description</label>
                    <Field
                      name="description"
                      rows={5}
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="description"></Field>
                    <br />
                    <label htmlFor="type">type</label>
                    <Field
                      name="type"
                      rows={6}
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="type"></Field>
                  </div>
                  <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
                    <button
                      type="submit"
                      className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                      onClick={() => {
                        if (formik.touched.description && formik.errors.description) {
                          showToast(formik.errors.description, 'title-error')
                        }
                      }}>
                      {label === 'Edit Quest' ? 'Save' : 'Post Quest'}
                    </button>
                  </div>
                </div>
              </Form>
            </section>
          )}
        </Formik>
      </div>
    </Auth>
  )
}

const ContentTextArea = ({
  label,
  ...props
}: {
  label: string
  name: string
  rows: number
  placeholder: string
}): JSX.Element => {
  const [field, meta] = useField(props)
  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <textarea
        className="flex rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? <div className="">{meta.error}</div> : null}
    </>
  )
}

const TitleTextInput = ({
  label,
  ...props
}: {
  label: string
  name: string
  type: string
  placeholder: string
}): JSX.Element => {
  const [field, meta] = useField(props)
  return (
    <>
      <div className="flex items-center">
        <label htmlFor={props.name}>{label}</label>
        {meta.touched && meta.error ? (
          <div className="ml-2 text-xs font-bold text-red-600">*required</div>
        ) : null}
      </div>
      <input
        className="flex rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        {...field}
        {...props}
      />
    </>
  )
}
