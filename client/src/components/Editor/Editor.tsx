import React, { useState } from 'react'
import { SubNode } from '../'
import { Cmd } from '../../commands'
import { GlobalContext } from '../../App'
import Button from '@material-ui/core/Button'
type EditorProps = {
  node: ListNode | null
}

const Editor = (props: EditorProps): JSX.Element => {
  const [node, setnode] = useState({ title: 'new tido' })
  return (
    <GlobalContext.Consumer>
      {({ state, dispatch }) => (
        <div className='editor'>
          <Button variant='contained' color='primary' onClick={() => { Cmd.createNode(node.title, false, dispatch) }} >
            new tido </Button>
          {props.node
            ? <SubNode node={props.node} index={1} />
            : undefined}
        </div>
      )}
    </GlobalContext.Consumer>
  )
}

export { Editor }
