const Search = (): JSX.Element => {
  return (
    <input
      type="text"
      className="block w-24 text-xs sm:w-auto sm:text-base py-1.5 pl-10 pr-4 rounded-xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400"
      placeholder="Search"
    />
  )
}

export default Search
