import React from 'react'
import { SubNode, SubNodeProps } from './SubNode'
import { Draggable } from 'react-beautiful-dnd'



function SubNodeWrapper(props: SubNodeProps): JSX.Element {
  return (
    <Draggable key={props.node.nodeId} draggableId={props.node.nodeId} index={props.index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <SubNode {...props} />
        </div>
      )}
    </Draggable>
  )
}

export { SubNodeWrapper }
