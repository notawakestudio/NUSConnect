const Search = (): JSX.Element => {
  return (
    <div className="shadow-md ml-2 rounded-lg border-2">
      <input
        type="text"
        className="block w-auto text-xs sm:w-auto sm:text-base py-1.5 px-6 rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400"
        placeholder="Search"
      />
    </div>
  )
}

export default Search
