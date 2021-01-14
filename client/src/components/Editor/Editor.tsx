import React, { useState } from 'react'
import { SubNode } from '../'
import { CMD } from '../../cmd'
import { GlobalContext } from '../../App'
import Button from '@material-ui/core/Button'
import { Droppable } from 'react-beautiful-dnd'
type EditorProps = {
  node: ListNode | null
}

const Editor = (props: EditorProps): JSX.Element => {
  const [node, setnode] = useState({ title: 'new tido' })
  return (
    <GlobalContext.Consumer>
      {({ state, dispatch }) => (
        <Droppable droppableId={'editorDroppable'}>
          {(provided) => (
            < div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className='editor'>
              <Button variant='contained' color='primary' onClick={() => { CMD.createNode(node.title, true, dispatch) }} >
                new tido </Button>
              {/* Drop a tido here to edit */}
              {props.node
                ? <SubNode node={props.node} index={1} />
                : undefined}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}
    </GlobalContext.Consumer>
  )
}

export { Editor }
