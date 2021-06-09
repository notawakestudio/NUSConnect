import { Form, Formik, useField } from 'formik'
import { useSession } from 'next-auth/client'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { makeReply, updateReply } from './ForumAPI'
import TextContainer from '../common/TextContainer'

export default function NewReply({
  postId,
  content = '',
  label = 'New comment',
  id = '',
  setEditing = function(bool){}
}: {
  postId: string
  content?: string
  label?: string
  id?: string
  setEditing?: (bool: boolean) => void
}) {
  const [session] = useSession()
  const initialValues = {
    content: content,
  }
  const handleSubmitNew = (value): void => {
    value.author = session.user?.name ? session.user.name : 'Anonymous'
    makeReply(value, postId)
  }

  const handleSubmitEdit = (value): void => {
    updateReply(value,  postId, id)
    setEditing(false)
  }
  return (
    <TextContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          content: Yup.string().required('*required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          if (label === 'New comment') {
            handleSubmitNew(values)
          } else {
            handleSubmitEdit(values)
          }
          setTimeout(() => {
            toast(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}>
        {(formik) => (
          <Form>
            <div className="items-center w-full px-4 pt-4 text-gray-500 flex-shrink-0 dark:text-gray-300">
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
                className="py-2 px-4 text-gray-200 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                Post
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </TextContainer>
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
}) => {
  const [field, meta] = useField(props)
  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <textarea
        className="flex rounded-lg border border-gray-300 w-full p-2 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-800 dark:text-gray-100"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? <div className="">{meta.error}</div> : null}
    </>
  )
}
