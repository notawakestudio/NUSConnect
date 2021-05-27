import React from 'react'

const TextContainer = ({ children }) => {
  return (
    <div className="flex-col items-start overflow-hidden shadow-lg rounded-lg border border-gray-200">
      {children}
    </div>
  )
}

export default TextContainer
