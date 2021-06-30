// https://kentcdodds.com/blog/how-to-use-react-context-effectively
import { useSession } from 'next-auth/client'
import { createContext, useContext, useEffect, useReducer } from 'react'
import { getCurrentDateTime } from '../common/Util'
import { defaultModuleInfo, makeUser } from '../profile/UserAPI'

type Action =
  | { type: 'init'; payload: string }
  | { type: 'success'; payload: string }
  | { type: 'register'; payload: string }
type Dispatch = (action: Action) => void
type State = { userId: string }
type StoreProviderProps = { children: React.ReactNode }

const StoreContext = createContext<{ state: State; dispatch: Dispatch }>(undefined)
function StoreReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'init': {
      console.log('init user ' + action.payload)
      return { userId: action.payload }
    }
    case 'success': {
      console.log('worked')
      return { userId: 'ddHg168Fwz9VIP1wxbzK' }
    }
    case 'register': {
      console.log('worked')
      return { userId: 'ddHg168Fwz9VIP1wxbzK' }
    }
    default: {
      throw new Error(`Unhandled action type`)
    }
  }
}

function UserProvider({ children }: StoreProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(StoreReducer, { userId: 'NSFDrUvhCdF11DOpWx5Sq' })
  const value = { state, dispatch }
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

function useUser() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a StoreProvider')
  }
  return context
}

function useUserId(): string {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a StoreProvider')
  }
  return context.state.userId
}

function useUserIdInit(): void {
  const { state, dispatch } = useContext(StoreContext)
  const [session] = useSession()
  useEffect(() => {
    if (session?.userId) {
      if ((session.userId as string) === state.userId) {
        return
      }
      dispatch({ type: 'init', payload: session.userId as string })
      makeUser({
        id: session.userId,
        modules: defaultModuleInfo,
        profilePicUrl: session.user.image,
        role: 'dreamer',
        displayName: session.user.name,
        userName: session.user.name,
        email: session.user.email,
        created_date: getCurrentDateTime(),
      })
    }
  }, [session, dispatch])
}

export { UserProvider, useUser, useUserId, useUserIdInit }
