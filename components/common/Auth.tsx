import { useSession } from 'next-auth/client'
import React from 'react'
import { useContext, useEffect, useState } from 'react'
import Login from './Login'

export const NameContext = React.createContext('user')

export function useName(): string {
  return useContext(NameContext)
}

export default function Auth({ children }: { children: React.ReactNode }): JSX.Element {
  const [session, loading] = useSession()
  const [name, setName] = useState('user')

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
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

  return <NameContext.Provider value={name}>{children}</NameContext.Provider>
}
