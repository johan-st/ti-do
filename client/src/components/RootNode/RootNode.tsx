import React from 'react'
import { SubNode } from '../index'

type RootNodeProps = {
  node: ListNode,
  children?: never[]
}
const RootNode = (props: RootNodeProps): JSX.Element => {
  return (
    <div>
      <SubNode item={props.node} />
    </div>
  )
}

export default RootNode