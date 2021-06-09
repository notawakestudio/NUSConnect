// https://kentcdodds.com/blog/how-to-use-react-context-effectively
import { createContext, useContext, useReducer } from 'react'
import { Post } from '../forum/ForumAPI'

type Action = { type: 'init'; payload?: any } | { type: 'success'; payload?: any }
type Dispatch = (action: Action) => void
type State = { posts: Post[] }
type StoreProviderProps = { children: React.ReactNode }

const StoreContext = createContext<{ state: State; dispatch: Dispatch }>(undefined)
// NOT READY AND NOT IN USE
function StoreReducer(state: State, action: Action) {
  switch (action.type) {
    case 'init': {
      console.log('init all posts')
      console.log('🚀 ~ file: forum.tsx ~ line 13 ~ StoreReducer ~ action', action)

      return { posts: action.payload }
    }
    case 'success': {
      console.log('Update posts into state')
      return { posts: action.payload.posts }
    }
    default: {
      throw new Error(`Unhandled action type`)
    }
  }
}

function ForumProvider({ children }: StoreProviderProps) {
  const [state, dispatch] = useReducer(StoreReducer, { posts: [] })
  const value = { state, dispatch }
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

function useForum() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useForum must be used within a StoreProvider')
  }
  return context
}

export { ForumProvider, useForum }
