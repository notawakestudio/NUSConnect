import { Field, Form, Formik, useField } from 'formik'
import { useSession } from 'next-auth/client'
import React from 'react'
import * as Yup from 'yup'
import { getAllTags, makeReply } from './ForumAPI'
import TextContainer from './TextContainer'

const initialValues = {
  content: '',
}

export default function NewReply({postId} : {postId: string}) {
  const [session] = useSession()

  const handleSubmit = (value): void => {
    value.author = session.user?.name ? session.user.name : 'Anonymous'
    makeReply(value, postId)
  }

  const tags = getAllTags()

  return (
    <div className="mt-8">
      <TextContainer>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            content: Yup.string().required('required*'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values)
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
              setSubmitting(false)
            }, 400)
          }}>
          {(formik) => (
            <Form>
              <div className="bg-white">
                <div className="items-center w-full p-4 space-y-2 text-gray-500 flex-shrink-0 flex-col">
                  <ContentTextArea
                    label="New comment"
                    name="content"
                    rows={6}
                    placeholder="Leave a comment"
                  />
                  <br />
                </div>
                <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
                  <button
                    type="submit"
                    className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    Post
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </TextContainer>
    </div>
  )
}

const ContentTextArea = ({
  label,
  ...props
}: {
  label: any
  name: string
  rows: number
  placeholder: string
}) => {
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
