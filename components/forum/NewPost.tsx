import { Field, Form, Formik, useField } from 'formik'
import { useSession } from 'next-auth/client'
import React from 'react'
import { default as Select } from 'react-select'
import * as Yup from 'yup'
import { makePost } from './ForumAPI'
import TextContainer from '../common/TextContainer'

const initialValues = {
  title: '',
  tags: [],
  content: '',
}

export default function NewPost({ tags }: { tags: string[] }) {
  const [session] = useSession()
  const handleSubmit = (value): void => {
    value.author = session.user?.name ? session.user.name : 'Anonymous'
    makePost(value)
  }

  return (
    <div className="mt-10 ml-4">
      <TextContainer>
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
              title: Yup.string().required('required*'),
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
                        <h1 className="text-gray-600">Make a post</h1>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 bg-white">
                    <div className="items-center w-full p-4 space-y-2 text-gray-500 flex-shrink-0 flex-col">
                      <div>Select Tags</div>
                      <Field name={'tags'} component={TagMultiSelect} options={tags} />
                      {/* <div id="checkbox-group"> Select Tags </div>
                      <div role="group" aria-labelledby="checkbox-group">
                        {tags.map((tag, index) => (
                          <span key={index} className="flex-row">
                            <label className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-black uppercase transition bg-indigo-100 rounded shadow ripple hover:shadow-lg hover:bg-indigo-200 focus:outline-none">
                              <Field className="mr-2" type="checkbox" name="tags" value={tag} />
                              {tag}
                            </label>
                          </span>
                        ))}
                      </div> */}
                      <br />
                      <TitleTextInput label="Title" name="title" type="text" placeholder="Title" />
                      <br />
                      <ContentTextArea
                        label="Content"
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
              </section>
            )}
          </Formik>
        </div>
      </TextContainer>
    </div>
  )
}

export const TagMultiSelect = ({
  field,
  form,
  options,
  isMulti = true,
}: {
  field: any
  form: any
  options: any
  isMulti: boolean
}) => {
  const onChange = (option) => {
    form.setFieldValue(field.name, isMulti ? option.map((item) => item.value) : option.value)
  }

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter((option) => field.value.indexOf(option.value) >= 0)
        : options.find((option) => option.value === field.value)
    } else {
      return isMulti ? [] : ('' as any)
    }
  }

  return (
    <Select
      name={field.name}
      value={getValue()}
      onChange={onChange}
      options={options}
      isMulti={isMulti}
    />
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

const TitleTextInput = ({
  label,
  ...props
}: {
  label: any
  name: string
  type: string
  placeholder: string
}) => {
  const [field, meta] = useField(props)
  return (
    <>
      <div className="flex">
        <label htmlFor={props.name}>{label}</label>
        {meta.touched && meta.error ? <div className="ml-2 text-red-500">{meta.error}</div> : null}
      </div>
      <input
        className="flex rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        {...field}
        {...props}
      />
    </>
  )
}
