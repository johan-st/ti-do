import { DropResult } from 'react-beautiful-dnd'

const initialState = {
  lists: [],
}

const DRAG_END = (res: DropResult):Msg => ({
  type: 'DRAG_END',
  payload: res,
})
const GOT_TASKS = (list: List):Msg => ({
  type: 'GOT_TASKS',
  payload: list,
})
const TASK_ADDED = (item: Item):Msg => ({
  type: 'TASK_ADDED',
  payload: item,
})
const TASK_CHANGED = (task: Item):Msg => ({
  type: 'TASK_CHANGED',
  payload: task,
})
const DELETE_TASK = ():Msg => ({ type: 'DELETE_TASK', payload: null })

const actions = {DRAG_END, GOT_TASKS, TASK_ADDED, TASK_CHANGED, DELETE_TASK}

const reducer = (state: State, msg: Msg) => {
  console.log(msg)
  switch (msg.type) {
  case 'DRAG_END':
    if ((msg.payload as DropResult).reason === 'CANCEL') {
      return state
    } else {
      // const { source, destination } = (msg.payload as DropResult)
      // const sourceClone = state.lists[source.droppableId]
      // const destClone = state[destination.droppableId]
      // const [movingTask] = sourceClone.splice(source.index, 1)
      // destClone.splice(destination.index, 0, movingTask)
      // return {
      //   ...state,
      //   [source.droppableId]: sourceClone,
      //   [destination.droppableId]: destClone,
      return state
      // }
    }
  case 'GOT_TASKS':
    return { ...state, lists:msg.payload }

  case 'TASK_ADDED':
    return { ...state, editor: [msg.payload] }

  case 'TASK_CHANGED':
    return { ...state, editor: [msg.payload] }

  case 'DELETE_TASK':
    return {
      ...state,
      // editor: [],
      // deleted: [...state.deleted, state.editor],
    }

  default:
    return state
  }
}

export { initialState, reducer, actions }
