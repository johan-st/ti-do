import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { GlobalContext } from '../../App'
import { RootNode } from './RootNode'

export type RootNodeWrapperProps = {
  node: ListNode
  children?: never[]
}
const RootNodeWrapper = (props: RootNodeWrapperProps): JSX.Element => {
  return (
    <GlobalContext.Consumer>
      {({ state, dispatch }) => (
        <Droppable droppableId={props.node.nodeId}>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}>
              <RootNode node={props.node} dispatch={dispatch} />
              {provided.placeholder}
            </div>)}
        </Droppable>
      )}
    </GlobalContext.Consumer>)
}

export { RootNodeWrapper }
