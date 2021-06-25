import { allAvailableTags } from '../forum/ForumAPI'
function TagBar({
  currTag,
  setCurrTag,
}: {
  currTag: string
  setCurrTag: (state: string) => void
}): JSX.Element {
  return (
    <div className="hidden lg:flex justify-center flex-wrap mb-4">
      {allAvailableTags.map((tag) => (
        <button
          key={tag}
          onClick={() => {
            if (currTag === tag) {
              setCurrTag('')
            } else {
              setCurrTag(tag)
            }
          }}
          className={`${
            currTag === tag ? 'bg-blue-200' : ''
          } border-blue-500 hover:bg-blue-200 rounded-full py-1 px-2 m-1 shadow-sm`}>
          {tag}
        </button>
      ))}
    </div>
  )
}

export default TagBar
