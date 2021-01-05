import { DropResult } from 'react-beautiful-dnd'
import { listPlaceholder } from './placeholders'

const initialState:State = {
  lists: listPlaceholder,
}
const ACTIONS = {
  DRAG_END : (res: DropResult):Action => ({
    type: 'DRAG_END',
    payload: res,
  }),
  GOT_ITEMS: (list: Item[]):Action => ({
    type: 'GOT_ITEMS',
    payload: list,
  }),
  ITEM_ADDED: (item: Item):Action => ({
    type: 'ITEM_ADDED',
    payload: item,
  }),
  ITEM_CHANGED: (task: Item):Action => ({
    type: 'ITEM_CHANGED',
    payload: task,
  }),
  DELETE_ITEM: ():Action => ({ type: 'DELETE_ITEM', payload: null })
}

const reducer = (state: State, action: Action):State => {
  console.log(action)
  switch (action.type) {
  case 'DRAG_END':
    if ((action.payload as DropResult).reason === 'CANCEL') {
      return state
    } else {
      // const { source, destination } = (action.payload as DropResult)
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
  case 'GOT_ITEMS':
    return { ...state, lists:(action.payload as Item[]) }

  case 'ITEM_ADDED':
    return { ...state}

  case 'ITEM_CHANGED':
    return { ...state}

  case 'DELETE_ITEM':
    return {
      ...state,
    }

  default:
    console.log('UNKNOWN ACTION')
    return state
  }
}

export { initialState, reducer, ACTIONS } 
