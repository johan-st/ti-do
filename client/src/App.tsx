import './App.css'
import React, { useReducer, createContext } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { reducer, initialState, Msg } from './reducer'
import { RootNodeWrapper, Editor } from './components'
import { useMountEffect } from './helpers'
import { Cmd } from './commands'



const GlobalContext = createContext({ state: { lists: [] as ListNode[] }, dispatch: (value: Msg) => { console.error('dispatch was passed ' + value + 'but is itself undefined') } })

function App(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)
  useMountEffect(() => { Cmd.fetchRoots(dispatch) })
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <DragDropContext onDragEnd={res => dispatch(Msg.DRAG_END(res))}>
        <Droppable droppableId={'rootsDroppable'}>
          {(provided) => (
            < div
              {...provided.droppableProps}
              ref={provided.innerRef}>
              <Editor node={state.editor} />
              {state.lists.map((node, index) => (
                <Draggable key={node.nodeId} draggableId={node.nodeId} index={index}>
                  {(provided) => (
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
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </GlobalContext.Provider >)
}
export default App
export { GlobalContext }
