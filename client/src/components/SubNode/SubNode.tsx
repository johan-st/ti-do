import React from 'react'
export type SubNodeProps = {
  node: ListNode
  index: number
  children?: never[]
}

function SubNode(props: SubNodeProps): JSX.Element {
  return (
    <div className='node'>
      {props.node.title}
      <div className="">{props.node.completed ? 'DONE' : ''}</div>
    </div>
  )
}

export { SubNode }
