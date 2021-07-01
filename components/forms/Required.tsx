import React from 'react'
import { CgAsterisk } from 'react-icons/cg'

export default function required(): JSX.Element {
  return (
    <div className="flex flex-row items center text-xs font-bold text-red-600 mb-0.5">
      <CgAsterisk className="mt-1" />
      <div>required</div>
    </div>
  )
}
