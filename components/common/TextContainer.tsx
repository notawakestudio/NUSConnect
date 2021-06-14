import React from 'react'

const TextContainer = ({ children }: { children?: JSX.Element | JSX.Element[] }): JSX.Element => {
  return (
    <div className="shadow-md rounded-lg border border-purple-200 dark:bg-gray-800 text-grey-800 dark:text-gray-200 flex-1">
      {children}
    </div>
  )
}

export default TextContainer
