import { Skeleton, useToast } from '@chakra-ui/react'
import { Field, Form, Formik, useField } from 'formik'
import { nanoid } from 'nanoid'
import { useSession } from 'next-auth/client'
import React from 'react'
import * as Yup from 'yup'
import Auth from '../common/Auth'
import { checkPostBadge, getCurrentWeek, notifyNewPost, renderMdToHtml } from '../common/Util'
import CustomSingleSelect from '../forms/CustomSingleSelect'
import Required from '../forms/Required'
import { TagMultiSelect } from '../forms/TagMultiSelect'
import { useAllQuestionsByModule, useQuestion } from '../quiz/QuizAPI'
import { useCurrentModule } from '../store/module'
import { useUserId } from '../store/user'
import { allAvailableTags, makePost, Post, updatePost } from './ForumAPI'

const defaultPost = {
  id: nanoid(),
  author_id: 'string',
  title: '',
  content: '',
  created_date: 0,
  edited_date: 0,
  tags: [],
  week: getCurrentWeek(),
  reply_count: 0,
  up_votes: 0,
  is_edited: false,
}

export default function NewPost({
  label = 'Make a post',
  currentPost = defaultPost,
  setEditing,
  related_question_id = '',
}: {
  label?: string
  currentPost?: Post
  setEditing?: (bool: boolean) => void
  related_question_id?: string
}): JSX.Element {
  //Initalizing values
  const tags = allAvailableTags.map((tag) => {
    return { value: tag, label: tag }
  })
  const initialValues = {
    title: currentPost.title,
    tags: label === 'link-from-quiz' ? ['Quiz', 'Question'] : currentPost.tags,
    content: currentPost.content,
    related_question_id: related_question_id ?? '',
  }

  const [session] = useSession()
  const userId = useUserId()
  const {
    state: { moduleId, moduleTitle },
  } = useCurrentModule()
  //Handling post request
  const handleSubmitNew = (value): void => {
    value.author = session.user?.name ? userId : 'Anonymous'
    makePost(moduleId, value)
    notifyNewPost(userId, moduleTitle)
    setTimeout(() => checkPostBadge(userId, moduleId, moduleTitle), 1000)
  }
  const handleSubmitUpdate = (value): void => {
    updatePost(moduleId, value, currentPost)
  }
  const handleSubmitWiki = (value): void => {
    value.author = session.user?.name ? userId : 'Anonymous'
    makePost(moduleId, value)
    notifyNewPost(userId, moduleTitle)
    setTimeout(() => checkPostBadge(userId, moduleId, moduleTitle), 1000)
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

  const { questions, isLoading } = useAllQuestionsByModule()
  const { question, isLoading: questionIsLoading, isError } = useQuestion(related_question_id)

  return (
    <Auth>
      <div
        className="bg-white overflow-hidden shadow-md rounded-lg dark:bg-gray-800 dark:text-gray-200"
        data-cy="newPostForm">
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            tags: Yup.array().min(1, 'Please select one tag'),
            title: Yup.string().required('Please enter a title'),
            content: Yup.string().required('Please enter some content'),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            if (label === 'Make a post' || label === 'link-from-quiz') {
              handleSubmitNew(values)
            } else if (label === 'Make into wiki') {
              handleSubmitWiki(values)
            } else if (label === 'Edit Post') {
              handleSubmitUpdate(values)
              setEditing(false)
            } else {
              toast({
                title: 'Something went wrong',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
              })
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
            <section className="bg-indigo-200 dark:bg-gray-800 dark:text-gray-200 ">
              <Form>
                <div className="p-4 bg-indigo-100 shadow-lg dark:bg-gray-600">
                  <div className="max-w-sm mx-auto md:w-full md:mx-0">
                    <div className="inline-flex items-center space-x-4">
                      <h1 className="dark:text-gray-200 text-lg font-semibold">
                        {label === 'link-from-quiz'
                          ? 'A post linked with this question will be created'
                          : label}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 bg-white dark:bg-gray-700 dark:text-gray-200">
                  <div className="items-center w-full p-4 text-gray-500 dark:text-gray-300 flex-shrink-0 flex-col">
                    <TitleTextInput label="Title" name="title" type="text" placeholder="Title" />
                    <br />
                    <span>Select Tags</span>
                    {formik.errors.tags && formik.touched.tags ? <Required /> : null}
                    <Field name={'tags'} component={TagMultiSelect} options={tags} />
                    <br />
                    <div>Link Question (optional)</div>
                    {label !== 'link-from-quiz' ? (
                      isLoading || questionIsLoading ? (
                        <Skeleton height="30px" />
                      ) : (
                        <>
                          <Field
                            component={CustomSingleSelect}
                            name="related_question_id"
                            options={questions.map((question) => {
                              return {
                                label: renderMdToHtml(question['question']),
                                value: question['id'],
                              }
                            })}
                            setValue={
                              related_question_id && !isError
                                ? {
                                    value: related_question_id,
                                    label: renderMdToHtml(question.question),
                                  }
                                : ''
                            }
                          />
                        </>
                      )
                    ) : (
                      ''
                    )}
                    <br />
                    <ContentTextArea
                      label="Content"
                      name="content"
                      rows={6}
                      placeholder="Thoughts/Questions/Comments/Ideas? Share!"
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
      {meta.touched && meta.error ? <Required /> : null}
      <textarea
        className="flex rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        {...field}
        {...props}
      />
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
        {meta.touched && meta.error ? <Required /> : null}
      </div>
      <input
        className="flex rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        {...field}
        {...props}
      />
    </>
  )
}
