import React, { Dispatch } from 'react'
import clsx from 'clsx'
import { SubNodeWrapper } from '../index'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { CMD } from '../../cmd'
import {
  IconButton,
  TextField,
  Button,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Collapse,
} from '@material-ui/core'
// import { red } from '@material-ui/core/colors'
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons'
// import { compile } from 'joi'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    notes: {
      font: '12'
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },

  }),
)


const RootNode = (props: RootNodeProps): JSX.Element => {
  console.log(props.node)

  const classes = useStyles()

  const [expanded, setExpanded] = React.useState(false)
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  const completeHandler = () => {
    CMD.toggleDone(props.node, props.dispatch)
  }
  const [notes, setNotes] = React.useState(props.node.notes)
  const [timeoutId, setTimeoutId] = React.useState(-1)

  const notesChangeHandler = (e: any) => {
    setNotes(e.target.value)
    console.log(e.target.value)

    clearTimeout(timeoutId)
    const id = setTimeout(() => {
      CMD.updateNode({ ...props.node, notes: e.target.value }, props.dispatch)
    }, 5000)
    setTimeoutId(id as unknown as number)
  }
  const subNodes = props.node.subNodes.map((node, index) => <SubNodeWrapper key={node.nodeId} node={node} index={index} />)
  return (
    <Card className={classes.root}>
      <CardHeader
        title={props.node.title}
        subheader={props.node.completed
          ? 'DONE'
          : 'pending'}
      />
      <CardContent>
        <TextField
          id="outlined-disabled"
          label="notes"
          variant="outlined"
          value={notes ? notes : ''}
          onChange={notesChangeHandler}
        />

      </CardContent>
      <CardActions>
        <Button size="small" onClick={completeHandler}>{props.node.completed ? 'done' : 'undone'}</Button>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {subNodes
            ? subNodes.length > 0 ? subNodes : 'no subtasks yet'
            : ''}
        </CardContent>
      </Collapse>
    </Card>
  )
}

export type RootNodeProps = {
  node: ListNode
  children?: never[]
  dispatch: Dispatch<Msg>
}

export { RootNode } 