import TextContainer from './TextContainer'

const Empty = (): JSX.Element => {
  return (
    <TextContainer>
      <div className="p-4 flex flex-col self-center items-center ">
        <p className="leading-relaxed mb-4"> unread posts </p>
        <p> Think of things to show here</p>
      </div>
    </TextContainer>
  )
}

export default Empty
