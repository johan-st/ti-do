import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { RootNode, RootNodeProps } from './RootNode'

const RootNodeWrapper = (props: RootNodeProps) => {
  return (
    <Droppable droppableId={props.node.nodeId}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}>
          <RootNode node={props.node} />
          {provided.placeholder}
        </div>)}
    </Droppable>
  )
}

export { RootNodeWrapper }
