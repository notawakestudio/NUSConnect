import { useSession } from 'next-auth/client'
import React from 'react'
import { useContext, useEffect, useState } from 'react'
import Login from '../../pages/login'

export const NameContext = React.createContext('user')

export function useName() {
  return useContext(NameContext)
}

export default function Auth({ children }): JSX.Element {
  const [session, loading] = useSession()
  const [name, setName] = useState('user')

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/userData')
      const json = await res.json()
      if (json.name) {
        setName(json.name)
      }
    }
    fetchData()
  }, [session])

  if (typeof window !== 'undefined' && loading) return null

  // to-do redirect to a better page
  if (!session) {
    return <Login></Login>
  }

  return (
    <NameContext.Provider value={name}>
      <div>{children}</div>
    </NameContext.Provider>
  )
}
