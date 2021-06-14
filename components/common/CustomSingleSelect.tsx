import { useField } from 'formik'
import Select from 'react-select'

export default function CustomSingleSelect(props) {
  const [field, state, { setValue, setTouched }] = useField(props.field.name)
  const onChange = (value: { value: string; label: string }) => setValue(value.value)
  return (
    <Select
      {...props}
      onChange={onChange}
      onBlur={setTouched}
      formatOptionLabel={function (data) {
        return <span dangerouslySetInnerHTML={{ __html: data.label }} />
      }}
      isSearchable={true}
      instanceId={field.name}
    />
  )
}
