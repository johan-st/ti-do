import React from 'react'
import { initialState, reducer, actions} from './reducer'

const GlobalContext = React.createContext({state: initialState, actions, reducer})

export { GlobalContext }
