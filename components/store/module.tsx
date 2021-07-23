// https://kentcdodds.com/blog/how-to-use-react-context-effectively
import { createContext, useContext, useReducer } from 'react'

type Action =
  | { type: 'switch'; payload: { moduleTitle: string; moduleId: string } }
  | { type: 'toggle' }
type Dispatch = (action: Action) => void
type State = { moduleTitle: string; moduleId: string }
type StoreProviderProps = { children: React.ReactNode }

const StoreContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined)

function StoreReducer(state: State, action: Action) {
  switch (action.type) {
    case 'switch': {
      return { ...action.payload }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function ModuleProvider({ children }: StoreProviderProps) {
  const [state, dispatch] = useReducer(StoreReducer, {
    moduleTitle: 'CS2030',
    moduleId: 'kMvp8b48SmTiXXCl7EAkc',
  })
  const value = { state, dispatch }
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

function useCurrentModule() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useCurrentModule must be used within a ModuleProvider')
  }
  return context
}

export { ModuleProvider, useCurrentModule }
