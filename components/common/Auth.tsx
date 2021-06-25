import { useSession } from 'next-auth/client'
import Login from './Login'

export default function Auth({ children }: { children: React.ReactNode }): JSX.Element {
  const [session, loading] = useSession()
  if (typeof window !== 'undefined' && loading) return null

  // to-do redirect to a better page
  // currently shows the Login component in place of children,
  // which turned out to be a valid approach
  if (!session) {
    return <Login></Login>
  }

  return <>{children}</>
}
