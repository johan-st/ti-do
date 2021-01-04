import './App.css'
import React, { useReducer } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import { GlobalContext } from './GlobalContext'
import { reducer, initialState, actions } from './reducer'
import Viewer from './components/Viewer'
import Planner from './components/Planner'

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <DragDropContext onDragEnd={res => dispatch(actions.DRAG_END(res))}>
        <div className="App">
          <Viewer>
            <Planner />
          </Viewer>
        </div>
      </DragDropContext>
    </GlobalContext.Provider>
  )
}

export default App
