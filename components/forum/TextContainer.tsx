import React from 'react'

const TextContainer = ({ children }: { children?: JSX.Element | JSX.Element[] }): JSX.Element => {
  return (
    <div className="flex-col items-start overflow-hidden shadow-md rounded-lg border border-purple-200">
      {children}
    </div>
  )
}

export default TextContainer
