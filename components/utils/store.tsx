// https://kentcdodds.com/blog/how-to-use-react-context-effectively
import { createContext, useContext, useReducer } from 'react'

type Action = { type: 'switch' } | { type: 'toggle' }
type Dispatch = (action: Action) => void
type State = { module: string }
type StoreProviderProps = { children: React.ReactNode }

const StoreContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined)

function StoreReducer(state: State, action: Action) {
  switch (action.type) {
    case 'switch': {
      console.log('The reducer will later be updated to toggle between modules')
      return { module: state.module }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function StoreProvider({ children }: StoreProviderProps) {
  const [state, dispatch] = useReducer(StoreReducer, { module: 'CS2030' })
  const value = { state, dispatch }
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

function useModule() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useModule must be used within a StoreProvider')
  }
  return context
}

export { StoreProvider, useModule }
