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
import { red } from '@material-ui/core/colors'
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons'

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
  const classes = useStyles()

  const [expanded, setExpanded] = React.useState(false)
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const [notes, setNotes] = React.useState(props.node.notes)
  let saveTimeout: NodeJS.Timeout
  const notesChangeHandler = (e: { target: { value: React.SetStateAction<string | undefined> } }) => {
    setNotes(e.target.value)
    saveTimeout.unref()
    saveTimeout = setTimeout(() => {
      CMD.updateNode({ ...props.node, notes: notes }, props.dispatch)
    }, 5000)
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
          value={notes}
          onChange={notesChangeHandler}
        />

      </CardContent>
      <CardActions>
        <Button size="small">done</Button>
        <Button size="small">remove</Button>
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
          {subNodes.length > 0 ? subNodes : 'no subtasks yet'}
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