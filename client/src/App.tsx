import './App.css'
import React, { useReducer } from 'react'
import { GlobalContext } from './GlobalCntext'
import { DragDropContext } from 'react-beautiful-dnd'
import { reducer, initialState, ACTIONS } from './reducer'
import { Item } from './components'
import { useMountEffect } from './helpers'
import { http } from './http'

function App(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)
  const items = state.lists.map(i => <Item key={i.id} item={i} />)
  useMountEffect(() => { http.fetchAll(dispatch) })

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <DragDropContext onDragEnd={res => dispatch(ACTIONS.DRAG_END(res))}>
        <div className="App">
          {items}
        </div>
      </DragDropContext>
    </GlobalContext.Provider >
  )
}
export default App
