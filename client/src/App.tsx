import React, { useReducer, createContext } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { reducer, initialState, Msg } from './reducer'
import { RootNodeWrapper, Editor, Copyright } from './components'
import { useMountEffect } from './helpers'
import { CMD } from './cmd'
import { ThemeProvider } from 'styled-components'
import { Grid } from '@material-ui/core'
// import { listPlaceholder } from './placeholders'


const theme = {
  spacing: 4,
  palette: {
    // --clr - bg: #333333;
    // --clr - text: #ff9900;
    // --clr - accent: #ff9900;
    // --clr - muted: #aaa;
    // --clr - node: rgb(14, 14, 14);
    // --clr - disabled: #444444;

    primary: '#ff9900',
  },
}


const GlobalContext = createContext(
  {
    // state: { lists: listPlaceholder },
    state: { lists: [] as ListNode[] },
    dispatch: (value: Msg) => {
      console.error('dispatch was passed ' + value + 'but is itself, undefined')
    }
  })

function App(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)
  useMountEffect(() => { CMD.fetchRoots(dispatch) })
  return (
    <ThemeProvider theme={theme}>
      <GlobalContext.Provider value={{ state, dispatch }}>
        <DragDropContext onDragEnd={res => dispatch(Msg.DRAG_END(res))}>
          <Editor node={state.editor} />
          <Droppable droppableId={'rootsDroppable'}>
            {(provided) => (
              < div
                {...provided.droppableProps}
                ref={provided.innerRef}>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
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
                </Grid>
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Copyright />
      </GlobalContext.Provider >
    </ThemeProvider >)

}
export default App
export { GlobalContext }
