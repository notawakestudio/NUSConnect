const Search = ({
  query,
  setQuery,
  design = Design.rounded,
}: {
  query: string
  setQuery: (query: string) => void
  design?: Design
}): JSX.Element => {
  if (design === Design.rounded) {
    return (
      <div className="shadow-md ml-2 rounded-lg border-2 flex">
        <input
          type="text"
          className="flex w-auto xs:block text-base py-1.5 px-4 rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    )
  } else if (design === Design.square) {
    return (
      <div className="shadow-md border flex">
        <input
          type="text"
          className="flex w-52 xs:block text-base py-1.5 px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 dark:bg-gray-800 text-gray-400"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    )
  }
}

export enum Design {
  rounded = 'rounded',
  square = 'square',
}

export default Search
