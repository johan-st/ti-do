import React from 'react'
import { SubNodeWrapper } from '../index'

export type RootNodeProps = {
  node: ListNode
  children?: never[]
}

const RootNode = (props: RootNodeProps): JSX.Element => {
  const subNodes = props.node.subNodes.map((node, index) => (<SubNodeWrapper key={node.nodeId} node={node} index={index} />))
  return (<div className="node">
    {props.node.title}
    {subNodes}
  </div>)


}

export { RootNode } 