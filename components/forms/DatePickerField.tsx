import React from 'react'
import { useField, useFormikContext } from 'formik'
import DatePicker from 'react-datepicker'

export const DatePickerField = ({ ...props }: any): JSX.Element => {
  const { setFieldValue } = useFormikContext()
  const [field] = useField(props)
  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val)
      }}
      className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
    />
  )
}
