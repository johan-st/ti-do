import React from 'react'
import { SubNode } from '../SubNode/SubNode'

type EditorProps = {
  node: ListNode
}

const Editor = (props: EditorProps): JSX.Element => {
  return (
    <div>
      <SubNode node={props.node} index={1} />   </div>
  )
}

export { Editor }
