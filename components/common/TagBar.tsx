import { allAvailableTags } from '../forum/NewPost'
function TagBar({ currTag, setCurrTag }: { currTag: string; setCurrTag: (state: string) => void }) {
  return (
    <div className="flex justify-center flex-wrap mb-2">
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
            currTag === tag ? 'bg-blue-200' : 'bg-blue-500'
          } text-white rounded-full py-1 px-2 m-1 shadow-sm`}>
          {tag}
        </button>
      ))}
    </div>
  )
}

export default TagBar
