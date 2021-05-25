import { getPostById } from './ForumAPI'

const PostMainItem = ({ id }): JSX.Element => {
  const currentPost = getPostById(id)
  const tags = currentPost.tags

  return (
    <div className="mt-10">
      <div className="p-12 flex flex-col items-start overflow-hidden shadow-lg rounded-lg h-full w-full my ">
        <h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">
          {currentPost.title}
        </h2>
        <p className="leading-relaxed mb-8">{currentPost.content}</p>
        <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100  w-full">
          <div className="flex flex-wrap justify-start items-center mt-4">
            {tags.map((tag) => (
              <div
                key={currentPost.id}
                className="text-xs mr-2 py-1.5 px-4 text-gray-600 bg-blue-100 rounded-2xl">
                #{tag}
              </div>
            ))}
          </div>
          <span className="text-gray-400 mr-3 mt-4 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
            <svg
              className="w-4 h-4 mx-2"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            {currentPost.upVotes}
          </span>
          <span className="text-gray-400 inline-flex mt-4 items-center leading-none text-sm">
            <svg
              className="w-4 h-4 mx-2"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24">
              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
            </svg>
            6
          </span>
        </div>
        <a className="inline-flex items-center">
          <span className="flex-grow flex flex-col pl-4">
            <span className="title-font font-medium text-gray-900">{currentPost.author} </span>
            <span className="text-gray-400 text-xs tracking-widest mt-0.5">Level 10</span>
          </span>
        </a>
      </div>
    </div>
  )
}

export default PostMainItem
