import React from 'react'
import TextContainer from './TextContainer'
import TextEditor from './TextEditor'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import { getAllTags, makePost } from './ForumAPI'
import { useSession } from 'next-auth/client'

const initialValues = {
  title: '',
  tags: [],
  content: 'test',
}

export default function NewPost() {
  const [session] = useSession()

  const handleSubmit = (value): void => {
    value.author = session.user?.name ? session.user.name : 'Anonymous'
    makePost(value)
  }

  const tags = getAllTags()

  console.log(tags)

  return (
    <div className="mt-10 ml-4">
      <TextContainer>
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
              title: Yup.string().required('Required'),
              content: Yup.string().required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values)
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2))
                setSubmitting(false)
              }, 400)
            }}>
            {(formik) => (
              <section className="bg-gray-100 bg-opacity-20">
                <Form>
                  <div className="p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-lg bg-opacity-5">
                    <div className="max-w-sm mx-auto md:w-full md:mx-0">
                      <div className="inline-flex items-center space-x-4">
                        <h1 className="text-gray-600">Make a quiz</h1>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6 bg-white">
                    <div className="items-center w-full p-4 space-y-4 text-gray-500 flex-shrink-0">
                      <div className="relative min-w-full ">
                        <div id="checkbox-group"> Tags </div>
                        <div role="group" aria-labelledby="checkbox-group">
                          {tags.map((tag, index) => (
                            <label key={index} className="mr-2">
                              <Field type="checkbox" name="tags" value={tag} />
                              {tag}
                            </label>
                          ))}
                        </div>
                        <hr />
                        <label htmlFor="title">Title</label>
                        <Field
                          type={TextContainer}
                          name="title"
                          rows={5}
                          className="flex rounded-lg border-transparent border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                          placeholder="title"></Field>
                        <ErrorMessage name="title" />
                        <hr />

                        <label htmlFor="title">Content</label>
                        <Field
                          name="content"
                          rows={5}
                          className="rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                          placeholder="content"></Field>
                        <ErrorMessage name="content" />
                        <hr />
                      </div>
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
              </section>
            )}
          </Formik>
        </div>
      </TextContainer>
      {/* <script src="https://cdn.ckeditor.com/4.16.0/standard/ckeditor.js"></script>

      <script>CKEDITOR.replace( 'content' );</script> */}
    </div>
  )
}
