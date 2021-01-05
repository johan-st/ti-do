import React from 'react'
import './SubNode.css'
import { SubNode, SubNodeProps } from './SubNode'
import { Draggable } from 'react-beautiful-dnd'
import { useEffect } from 'react'



function SubNodeWrapper(props: SubNodeProps): JSX.Element {
  useEffect(() => {
    console.log('sub wrapper')

  }, [])
  return (
    <Draggable key={props.node.nodeId} draggableId={props.node.nodeId} index={props.index}>
      {(provided, snapshot) => (
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
