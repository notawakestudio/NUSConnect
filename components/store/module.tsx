// https://kentcdodds.com/blog/how-to-use-react-context-effectively
import { createContext, useContext, useReducer } from 'react'
import useLocalStorage from './localStorage'

type Action =
  | { type: 'switch'; payload: { moduleTitle: string; moduleId: string } }
  | { type: 'toggle' }
type Dispatch = (action: Action) => void
type State = { moduleTitle: string; moduleId: string }
type StoreProviderProps = { children: React.ReactNode }

const StoreContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined)
const defaultMod = {
  moduleTitle: 'CS2030',
  moduleId: 'kMvp8b48SmTiXXCl7EAkc',
}

function StoreReducer(
  state: State,
  action: Action
): {
  moduleTitle: string
  moduleId: string
} {
  switch (action.type) {
    case 'switch': {
      return { ...action.payload }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function ModuleProvider({ children }: StoreProviderProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [storedValue, setValue] = useLocalStorage('module', defaultMod)
  const [state, dispatch] = useReducer(StoreReducer, storedValue)
  const value = { state, dispatch }
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

function useCurrentModule(): {
  state: State
  dispatch: Dispatch
} {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useCurrentModule must be used within a ModuleProvider')
  }
  return context
}

export { ModuleProvider, useCurrentModule }
