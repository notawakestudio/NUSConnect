import { useField } from 'formik'
import Select from 'react-select'

export default function CustomMultiSelect(props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, state, { setValue, setTouched }] = useField(props.field.name)
  const onChange = (value: Array<{ value: string; label: string }>): void =>
    setValue(value.map((item) => item.value))
  return (
    <Select
      {...props}
      onChange={onChange}
      onBlur={setTouched}
      formatOptionLabel={function (data) {
        return <span dangerouslySetInnerHTML={{ __html: data.label }} />
      }}
      isMulti
      isSearchable={true}
    />
  )
}
