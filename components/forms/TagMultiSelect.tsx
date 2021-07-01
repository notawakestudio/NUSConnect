import React from 'react'
import { default as Select } from 'react-select'

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
