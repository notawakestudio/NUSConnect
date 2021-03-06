import { useToast } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { nanoid } from 'nanoid'
import { useSession } from 'next-auth/client'
import React from 'react'
import * as Yup from 'yup'
import Auth from '../common/Auth'
import { getCurrentDateTime } from '../common/Util'
import { DatePickerField } from '../forms/DatePickerField'
import Required from '../forms/Required'
import { useCurrentModule } from '../store/module'
import { makeQuest, Quest, updateQuest } from './ModuleAPI'

const defaultQuest = {
  id: nanoid(),
  description: '',
  type: 'quiz',
  count: 1,
  week: 1,
  link: '',
  start_date: getCurrentDateTime(),
  end_date: getCurrentDateTime(),
  reward: {
    exp: 10,
    badge: '',
  },
}

export default function NewQuest({
  label = 'Create Quest',
  currentQuest = defaultQuest,
  setEditing,
}: {
  label?: string
  currentQuest?: Quest
  setEditing?: (bool: boolean) => void
}): JSX.Element {
  //Initalizing values
  const exp = currentQuest.reward.exp
  const start_date = currentQuest.start_date
  const end_date = currentQuest.end_date

  const initialValues = {
    description: currentQuest.description,
    type: currentQuest.type,
    exp: exp.toString(),
    count: currentQuest.count,
    start_date: new Date(start_date),
    end_date: new Date(end_date),
  }

  //User Session
  const [session] = useSession()
  const {
    state: { moduleId },
  } = useCurrentModule()
  //Handling Quest request
  const handleSubmitNew = (value): void => {
    value.author = session.user?.name ? session.user.name : 'Anonymous'
    makeQuest(moduleId, value)
  }

  const handleSubmitUpdate = (value): void => {
    updateQuest(moduleId, value, currentQuest)
  }

  //Initialize toast for error message
  const errorToast = useToast()
  function showToast(error: string, id: string): void {
    if (!errorToast.isActive(id)) {
      errorToast({
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

  //Toast for success message
  const toast = useToast()

  return (
    <Auth>
      <div
        className="bg-white overflow-hidden dark:bg-gray-800 dark:text-gray-200 w-full"
        data-cy="newQuestForm">
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            description: Yup.string().required('Please enter a description'),
            type: Yup.string().required('A type option is required'),
            exp: Yup.string().required('A EXP option is required'),
            start_date: Yup.date().required('Please select a start date'),
            end_date: Yup.date().required('Please select a end date'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log('submitting')
            if (label === 'Create Quest') {
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
            <section className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-600 dark:text-gray-200 w-full">
              <Form className={label === 'Create Quest' ? 'px-4 md:px-6 pt-20' : ''}>
                <div className="flex justify-between text-gray-600 dark:text-gray-200">
                  <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
                    {label === 'Create Quest' ? label : 'Edit quest'}
                  </h1>
                </div>

                <div className="flex flex-col space-y-2 bg-white dark:bg-gray-800 mt-4">
                  <div className="py-1">
                    <span className="flex space-x-2 items-end">
                      <label htmlFor="description">Description</label>
                      {formik.errors.description && formik.touched.description ? (
                        <Required />
                      ) : null}
                    </span>
                    <Field
                      name="description"
                      rows={5}
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Please enter a quest"></Field>
                  </div>
                  <hr />

                  <div className="py-1">
                    <label htmlFor="type">Type</label>
                    <div className="flex flex-row space-x-4 text-lg">
                      <label htmlFor="type">
                        <Field type="radio" name="type" value="quiz" className="mr-1" />
                        Quiz
                      </label>
                      <label htmlFor="type">
                        <Field type="radio" name="type" value="forum" className="mr-1" />
                        Forum
                      </label>
                    </div>
                  </div>
                  <hr />

                  <div className="py-1">
                    <label htmlFor="exp">EXP Amount</label>
                    <div className="flex flex-row space-x-4 text-lg">
                      <label htmlFor="exp">
                        <Field type="radio" name="exp" value="10" className="mr-1" />
                        Small (10 EXP)
                      </label>
                      <label htmlFor="exp">
                        <Field type="radio" name="exp" value="20" className="mr-1" />
                        Medium (20 EXP)
                      </label>
                      <label htmlFor="exp">
                        <Field type="radio" name="exp" value="30" className="mr-1" />
                        Large (30 EXP)
                      </label>
                      <label htmlFor="exp">
                        <Field type="radio" name="exp" value="100" className="mr-1" />
                        Huge (100 EXP)
                      </label>
                    </div>
                  </div>
                  <hr />

                  <div className="py-1">
                    <label htmlFor="count">Count</label>
                    <Field
                      name="count"
                      type="number"
                      rows={5}
                      className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder={1}></Field>
                  </div>
                  <hr />

                  <div className="py-2">
                    <span className="flex space-x-2 items-end">
                      <label htmlFor="start_date">Starting date</label>
                      {formik.errors.start_date && formik.touched.start_date ? <Required /> : null}
                    </span>
                    <div className="">
                      <DatePickerField name="start_date" key="start_date" />
                    </div>
                  </div>
                  <hr />

                  <div className="py-2">
                    <span className="flex space-x-2 items-end">
                      <label htmlFor="end_date">End date</label>
                      {formik.errors.end_date && formik.touched.end_date ? <Required /> : null}
                    </span>
                    <div className="">
                      <DatePickerField name="end_date" key="end_date" />
                    </div>
                  </div>
                  <hr />

                  <div
                    className={
                      label === 'Create Quest'
                        ? 'w-full px-4 py-4 ml-auto text-gray-500 md:w-1/3'
                        : 'w-full'
                    }>
                    <button
                      type="submit"
                      className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
                      onClick={() => {
                        if (formik.touched.description && formik.errors.description) {
                          showToast(formik.errors.description, 'title-error')
                        }
                        if (formik.touched.type && formik.errors.type) {
                          showToast(formik.errors.type, 'type-error')
                        }
                        if (formik.touched.exp && formik.errors.exp) {
                          showToast(formik.errors.exp, 'exp-error')
                        }
                        if (formik.touched.start_date && formik.errors.start_date) {
                          showToast('Please select a starting date', 'startDate-error')
                        }
                        if (formik.touched.end_date && formik.errors.end_date) {
                          showToast('Please select a ending date', 'endDate-error')
                        }
                      }}>
                      {label === 'Create Quest' ? 'Create Quest' : 'Save changes'}
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
