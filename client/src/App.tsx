import './App.css'
import React, { useReducer } from 'react'
import { GlobalContext } from './GlobalContext'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { reducer, initialState, ACTIONS } from './reducer'
import { RootNodeWrapper } from './components'
import { useMountEffect } from './helpers'
import { http } from './http'

function App(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)
  useMountEffect(() => { http.fetchAll(dispatch) })

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <DragDropContext onDragEnd={res => dispatch(ACTIONS.DRAG_END(res))}>
        <Droppable droppableId={'rootsDroppable'}>
          {(provided, snapshot) => (
            < div
              {...provided.droppableProps}
              ref={provided.innerRef}>
              {state.lists.map((node, index) => (
                <Draggable key={node.nodeId} draggableId={node.nodeId} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <RootNodeWrapper node={node} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>)}
        </Droppable>
      </DragDropContext>
    </GlobalContext.Provider >)
}
export default App
