import './App.css'
import React, { useReducer } from 'react'
import { GlobalContext } from './GlobalContext'
import { DragDropContext } from 'react-beautiful-dnd'
import { reducer, initialState, ACTIONS } from './reducer'
import { SubNode } from './components'
import { useMountEffect } from './helpers'
import { http } from './http'

function App(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)
  const lists = state.lists.map(i => <SubNode key={i.nodeId} item={i} />)
  useMountEffect(() => { http.fetchAll(dispatch) })

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <DragDropContext onDragEnd={res => dispatch(ACTIONS.DRAG_END(res))}>
        <div className="App">
          {lists}
        </div>
      </DragDropContext>
    </GlobalContext.Provider >
  )
}
export default App
