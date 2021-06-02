import TextContainer from './TextContainer'

const ForumHome = (): JSX.Element => {
  return (
    <div className="hidden lg:flex self-center p-10 ">
      <TextContainer>
        <div className="p-4 flex flex-col items-center">
          <p className="leading-relaxed mb-4"> you have 3 unread posts</p>
          <p className="leading-relaxed mb-4"> Contribute a new post</p>
          <p className="leading-relaxed mb-4"> Help students answer their posts</p>
        </div>
      </TextContainer>
    </div>
  )
}

export default ForumHome
