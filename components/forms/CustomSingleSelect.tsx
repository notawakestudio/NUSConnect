import { useField } from 'formik'
import Select from 'react-select'

export default function CustomSingleSelect(props): JSX.Element {
  const [field, state, { setValue, setTouched }] = useField(props.field.name)
  console.log(props)
  const onChange = (value: { value: string; label: string }): void => setValue(value.value)
  return (
    <Select
      {...props}
      defaultValue={props.setValue ?? ''}
      onChange={onChange}
      onBlur={setTouched}
      formatOptionLabel={function (data) {
        return <span dangerouslySetInnerHTML={{ __html: data.label }} />
      }}
      isSearchable={true}
      instanceId={field.name}
      styles={customStyles}
    />
  )
}

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'red' : 'blue',
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = 'opacity 300ms'

    return { ...provided, opacity, transition }
  },
}
