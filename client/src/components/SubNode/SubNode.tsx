import React from 'react'
import './SubNode.css'

export type SubNodeProps = {
  node: ListNode
  index: number
  children?: never[]
}

function SubNode(props: SubNodeProps): JSX.Element {
  return (
    <div className='item'>
      {props.node.title}
      <div className="item--complete">{props.node.completed ? 'DONE' : ''}</div>
    </div>
  )
}

export { SubNode }
