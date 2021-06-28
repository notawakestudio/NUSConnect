import { useToast } from '@chakra-ui/react'
import { Form, Formik, useField } from 'formik'
import { nanoid } from 'nanoid'
import { useSession } from 'next-auth/client'
import React from 'react'
import * as Yup from 'yup'
import Auth from '../common/Auth'
import { Announcement, makeAnnouncement, updateAnnouncement } from './DashboardAPI'

const defaultAnnouncement = {
  id: nanoid(),
  author_id: 'string',
  title: '',
  content: '',
  created_date: 0,
}

export default function NewAnnouncement({
  label = 'Make an Announcement',
  currentAnnouncement = defaultAnnouncement,
  setEditing = function (bool) {},
}: {
  label?: string
  currentAnnouncement?: Announcement
  setEditing?: (bool: boolean) => void
}): JSX.Element {
  //Initalizing values
  const initialValues = {
    title: currentAnnouncement.title,
    content: currentAnnouncement.content,
  }

  //User Session
  const [session] = useSession()

  //Handling Announcement request
  const handleSubmitNew = (value): void => {
    value.author = session.user?.name ? session.user.name : 'Anonymous'
    makeAnnouncement(value)
  }
  const handleSubmitUpdate = (value): void => {
    updateAnnouncement(value, currentAnnouncement)
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
        data-cy="newAnnouncementForm">
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            tags: Yup.array().min(1, 'Please select one tag'),
            title: Yup.string().required('Please enter a title'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            if (label === 'Make an Announcement') {
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
                        {label === 'Make an Announcement' ? label : 'Edit an Announcement'}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 bg-white dark:bg-gray-700 dark:text-gray-200">
                  <div className="items-center w-full p-4 text-gray-500 dark:text-gray-300 flex-shrink-0 flex-col">
                    <TitleTextInput label="Title" name="title" type="text" placeholder="Title" />
                    <br />
                    <ContentTextArea
                      label="Content (optional)"
                      name="content"
                      rows={6}
                      placeholder="Leave a comment"
                    />
                    <br />
                  </div>
                  <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
                    <button
                      type="submit"
                      className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                      onClick={() => {
                        if (formik.touched.title && formik.errors.title) {
                          showToast(formik.errors.title, 'title-error')
                        }
                      }}>
                      {label === 'Edit Announcement' ? 'Save' : 'Post Announcement'}
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
