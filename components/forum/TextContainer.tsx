import React from 'react'

const TextContainer = ({ children }: { children?: JSX.Element | JSX.Element[] }): JSX.Element => {
  return (
    <div className="flex-col items-start overflow-hidden shadow-md rounded-lg border border-purple-200 bg-gray-50 dark:bg-gray-800 text-grey-800 dark:text-gray-200">
      {children}
    </div>
  )
}

export default TextContainer
