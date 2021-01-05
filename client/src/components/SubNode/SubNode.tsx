import React from 'react'
import './SubNode.css'

type ListNodeProps = {
  item: ListNode,
  children?: never[]
}

function ListNode(props: ListNodeProps): JSX.Element {
  return (
    <div className='item'>
      {props.item.title}
      <div className="item--complete">{props.item.completed ? 'DONE' : ''}</div>
    </div>
  )
}

export default ListNode
