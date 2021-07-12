import { allAvailableTags } from '../forum/ForumAPI'

function TagBar({
  currTag,
  setCurrTag,
}: {
  currTag: string
  setCurrTag: (state: string) => void
}): JSX.Element {
  const tags = allAvailableTags

  return (
    <div className="hidden lg:flex flex-row flex-wrap overflow-x-auto justify-left pb-1 w-full">
      {tags.map((tag) => (
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
          } border-blue-500 hover:bg-blue-200 dark:hover:bg-blue-600 px-2 m-1 dark:text-gray-300 text-sm`}>
          {tag}
        </button>
      ))}
    </div>
  )
}

export default TagBar
