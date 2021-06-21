import { useToast } from '@chakra-ui/react'
import { Field, Form, Formik, useField } from 'formik'
import { nanoid } from 'nanoid'
import { useSession } from 'next-auth/client'
import React from 'react'
import { default as Select } from 'react-select'
import * as Yup from 'yup'
import Auth from '../common/Auth'
import CustomSingleSelect from '../common/CustomSingleSelect'
import { makePost, Post, updatePost } from './ForumAPI'

export const allAvailableTags = [
  'Question',
  'Lecture',
  'Quiz',
  'Admin',
  'week1',
  'week2',
  'week3',
  'week4',
  'week5',
  'week6',
  'week7',
  'week8',
  'week9',
  'week10',
  'week11',
  'week12',
  'week13',
  'wiki',
]

const defaultPost = {
  id: nanoid(),
  author_id: 'string',
  title: '',
  content: '',
  created_date: 0,
  edited_date: 0,
  tags: [],
  week: '1',
  reply_count: 0,
  up_votes: 0,
  is_edited: false,
}

export default function NewPost({
  label = 'Make a post',
  currentPost = defaultPost,
  setEditing = function (bool) {},
  related_question_id,
  questionList,
}: {
  label?: string
  currentPost?: Post
  setEditing?: (bool: boolean) => void
  related_question_id?: string
  questionList?: { label: string; value: string }
}): JSX.Element {
  //Initalizing values
  const tags = allAvailableTags.map((tag) => {
    return { value: tag, label: tag }
  })
  const initialValues = {
    title: currentPost.title,
    tags: related_question_id ? ['Quiz', 'Question'] : currentPost.tags,
    content: currentPost.content,
    related_question_id: related_question_id ?? '',
  }

  //User Session
  const [session] = useSession()

  //Handling post request
  const handleSubmitNew = (value): void => {
    value.author = session.user?.name ? session.user.name : 'Anonymous'
    makePost(value)
  }
  const handleSubmitUpdate = (value): void => {
    updatePost(value, currentPost)
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
      <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            tags: Yup.array().min(1, 'Please select one tag'),
            title: Yup.string().required('Please enter a title'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            if (label === 'Make a post') {
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
            <section className="bg-gray-100 bg-opacity-20">
              <Form>
                <div className="p-4 bg-gray-100 border border-indigo-300 rounded-lg bg-opacity-5">
                  <div className="max-w-sm mx-auto md:w-full md:mx-0">
                    <div className="inline-flex items-center space-x-4">
                      <h1 className="text-gray-600">
                        {!related_question_id
                          ? label
                          : label === 'Edit Post'
                          ? label
                          : 'A post linked with this question will be created'}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 bg-white">
                  <div className="items-center w-full p-4 text-gray-500 flex-shrink-0 flex-col">
                    <TitleTextInput label="Title" name="title" type="text" placeholder="Title" />
                    <br />
                    <span>Select Tags</span>
                    {formik.errors.tags && formik.touched.tags ? (
                      <span className="text-xs font-bold text-red-600 ml-2">* required </span>
                    ) : null}
                    <Field name={'tags'} component={TagMultiSelect} options={tags} />
                    <br />
                    {!related_question_id ? (
                      <>
                        <div>Link Question (optional)</div>
                        <Field
                          component={CustomSingleSelect}
                          name="related_question_id"
                          options={questionList}
                          className=""
                        />
                        <br />
                      </>
                    ) : (
                      ''
                    )}
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
                        if (formik.touched.tags && formik.errors.tags) {
                          showToast(formik.errors.tags as string, 'tags-error')
                        }
                      }}>
                      {label === 'Edit Post' ? 'Save' : 'Post'}
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
}): JSX.Element => {
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
  label: any
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
