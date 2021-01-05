import React from 'react'
import { SubNodeWrapper } from '../index'

export type RootNodeProps = {
  node: ListNode
  children?: never[]
}

const RootNode = (props: RootNodeProps): JSX.Element => {
  const subNodes = props.node.subNodes.map((node, index) => (<SubNodeWrapper key={node.nodeId} node={node} index={index} />))
  return (<>
    {props.node.title}
    {subNodes}

  </>)


}

export { RootNode } 