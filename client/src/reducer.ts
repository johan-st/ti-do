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
  GOT_ITEMS: (list: Node[]):Action => ({
    type: 'GOT_ITEMS',
    payload: list,
  }),
  ITEM_ADDED: (item: Node):Action => ({
    type: 'ITEM_ADDED',
    payload: item,
  }),
  ITEM_CHANGED: (task: Node):Action => ({
    type: 'ITEM_CHANGED',
    payload: task,
  }),
  DELETE_ITEM: (id:NodeId):Action => ({ 
    type: 'DELETE_ITEM', payload: id 
  })
}

const reducer = (state: State, action: Action):State => {
  console.log(action)
  switch (action.type) {
  case 'DRAG_END':
    if ((action.payload as DropResult).reason === 'CANCEL') {
      return state
    } else {
      
      return state
    }
  case 'GOT_ITEMS':
    return { ...state, lists:(action.payload as ListNode[]) }

  case 'ITEM_ADDED':
    return { ...state, lists: [...state.lists, (action.payload as ListNode)]}

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
