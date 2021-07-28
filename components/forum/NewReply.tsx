import { useToast } from '@chakra-ui/react'
import { Form, Formik, useField } from 'formik'
import { useSession } from 'next-auth/client'
import React from 'react'
import * as Yup from 'yup'
import Auth from '../common/Auth'
import { checkReplyBadge } from '../common/Util'
import Required from '../forms/Required'
import { useCurrentModule } from '../store/module'
import { useUserId } from '../store/user'
import { makeReply, updateReply } from './ForumAPI'

export default function NewReply({
  postId,
  content = '',
  label = 'New comment',
  id = '',
  setEditing,
}: {
  postId: string
  content?: string
  label?: string
  id?: string
  setEditing?: (bool: boolean) => void
}): JSX.Element {
  const [session] = useSession()
  const initialValues = {
    content: content,
  }
  const userId = useUserId()
  const {
    state: { moduleId, moduleTitle },
  } = useCurrentModule()
  const handleSubmitNew = (value): void => {
    value.author = session.user?.name ? userId : 'Anonymous'
    makeReply(moduleId, value, postId)
    setTimeout(() => checkReplyBadge(userId, moduleId, moduleTitle), 500)
  }

  const handleSubmitEdit = (value): void => {
    updateReply(moduleId, value, postId, id)
    setEditing(false)
  }

  const toast = useToast()
  function showToast(error: string, toastId: string): void {
    if (!toast.isActive(toastId)) {
      toast({
        id: toastId,
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
      <div className="pb-8">
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            content: Yup.string().required('Please enter your comment'),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            if (label === 'New comment') {
              handleSubmitNew(values)
            } else {
              handleSubmitEdit(values)
            }
            toast({
              title: 'Success!',
              status: 'success',
              duration: 5000,
              isClosable: true,
              position: 'top-right',
            })
            setSubmitting(false)
            resetForm()
          }}>
          {(formik) => (
            <Form>
              <div
                className={
                  label === 'New comment'
                    ? 'items-center w-full px-1 text-gray-500 flex-shrink-0 dark:text-gray-300'
                    : 'text-gray-500 flex-shrink-0 dark:text-gray-300'
                }
                data-cy="newReplyForm">
                <ContentTextArea
                  label={label}
                  name="content"
                  rows={6}
                  placeholder="Leave a comment"
                />
                <br />
              </div>
              <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
                <button
                  type="submit"
                  className="py-2 px-4 text-gray-200 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                  onClick={() => {
                    if (formik.touched.content && formik.errors.content) {
                      showToast(formik.errors.content, 'content-error')
                    }
                  }}>
                  Post
                </button>
              </div>
            </Form>
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
      <label htmlFor={props.name}>{label} </label>
      {meta.touched && meta.error ? <Required /> : ''}
      <textarea
        className="flex rounded-lg border border-gray-300 w-full p-2 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-800 dark:text-gray-100"
        {...field}
        {...props}
      />
    </>
  )
}
