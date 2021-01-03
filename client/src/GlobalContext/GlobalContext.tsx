import React from 'react'
import { updateState } from './updateState'
import { commands } from './commands'


const context: GlobalContext = {
  state: { lists: [] },
  commands,
  updateState,

}


const GlobalContext = React.createContext(context)

export { GlobalContext } 