import { useToast } from '@chakra-ui/react'
import { Field, Form, Formik, useField } from 'formik'
import { nanoid } from 'nanoid'
import { useSession } from 'next-auth/client'
import React from 'react'
import * as Yup from 'yup'
import Auth from '../common/Auth'
import Required from '../forms/Required'
import { useUserId } from '../store/user'
import { Announcement, makeAnnouncement, updateAnnouncement } from './ModuleAPI'

const defaultAnnouncement = {
  id: nanoid(),
  author_id: 'string',
  week: 1,
  title: '',
  content: '',
  created_date: 0,
}

export default function NewAnnouncement({
  label = 'Make an Announcement',
  currentAnnouncement = defaultAnnouncement,
  setEditing,
}: {
  label?: string
  currentAnnouncement?: Announcement
  setEditing?: (bool: boolean) => void
}): JSX.Element {
  //Initalizing values
  const initialValues = {
    title: currentAnnouncement.title,
    content: currentAnnouncement.content,
    week: currentAnnouncement.week,
  }

  //User Session
  const [session] = useSession()
  const userId = useUserId()
  //Handling Announcement request
  const handleSubmitNew = (value): void => {
    value.author_id = session.user?.name ? userId : 'Anonymous'
    makeAnnouncement('kMvp8b48SmTiXXCl7EAkc', value)
  }
  const handleSubmitUpdate = (value): void => {
    updateAnnouncement(value, 'kMvp8b48SmTiXXCl7EAkc', currentAnnouncement)
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
        className="bg-white overflow-hidden dark:bg-gray-800 dark:text-gray-200 w-full"
        data-cy="newAnnouncementForm">
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            title: Yup.string().required('Please enter a title'),
            week: Yup.number().required('Please enter current week'),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
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
            resetForm()
          }}>
          {(formik) => (
            <section className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-600 dark:text-gray-200 w-full">
              <Form className={label === 'Make an Announcement' ? 'px-4 md:px-6 pt-20' : ''}>
                <div className="flex justify-between text-gray-600 dark:text-gray-200">
                  <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
                    {label === 'Make an Announcement' ? label : 'Edit an Announcement'}
                  </h1>
                </div>

                <div className="flex flex-col space-y-2 bg-white dark:bg-gray-800 mt-4">
                  <div className="py-1">
                    <span className="flex space-x-2 items-end">
                      <label htmlFor="title">Title</label>
                      {formik.errors.title && formik.touched.title ? <Required /> : null}
                    </span>
                    <Field
                      name="description"
                      rows={5}
                      className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Please enter a title"></Field>
                  </div>
                  <hr />

                  <div className="py-1">
                    <div className="flex space-x-2 items-end">
                      <div>Week</div>
                      {formik.errors.week && formik.touched.week ? <Required /> : null}
                    </div>
                    <Field
                      name="week"
                      type="number"
                      min={0}
                      max={13}
                      className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="week"
                      holder="week"></Field>
                  </div>
                  <hr />

                  <ContentTextArea
                    label="Content (optional)"
                    name="content"
                    rows={6}
                    placeholder="Leave a comment"
                  />
                  <hr />

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
      <div className="py-1">
        <label htmlFor={props.name}>{label}</label>
        <textarea
          className="flex rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? <div className="">{meta.error}</div> : null}
      </div>
    </>
  )
}
