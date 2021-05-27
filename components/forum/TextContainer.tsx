import React from 'react'

const TextContainer = ({ children }) => {
  return (
    <div className="flex-col items-start overflow-hidden shadow-lg rounded-lg border border-gray-200">
      <div className="">{children}</div>
    </div>
  )
}

export default TextContainer
