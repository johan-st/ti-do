import { DropResult } from 'react-beautiful-dnd'
// import { listPlaceholder } from './placeholders'

const initialState:State = {
  lists: [],
  editor: null
}
const Msg = {
  DRAG_END : (res: DropResult):Msg => ({
    type: 'DRAG_END',
    payload: res,
  }),
  GOT_ITEMS: (list: ListNode[]):Msg => ({
    type: 'GOT_ITEMS',
    payload: list,
  }),
  ITEM_ADDED: (item: ListNode):Msg => ({
    type: 'ITEM_ADDED',
    payload: item,
  }),
  ITEM_CHANGED: (task: ListNode):Msg => ({
    type: 'ITEM_CHANGED',
    payload: task,
  }),
  DELETE_ITEM: (id:NodeId):Msg => ({ 
    type: 'DELETE_ITEM', payload: id 
  })
}

const reducer = (state: State, action: Msg):State => {
  console.log(action)
  switch (action.type) {
  case 'DRAG_END':
    if ((action.payload as DropResult).reason === 'CANCEL') {
      return { ...state}
    } else {
      return { ...state}
    }

  case 'GOT_ITEMS':
    return { ...state, lists:(action.payload as ListNode[]) }

  case 'ITEM_ADDED':
    return { ...state, lists: [...state.lists, action.payload as ListNode]}

  case 'ITEM_CHANGED':
    return { ...state}

  case 'DELETE_ITEM':
    return {...state}

  default:
    throw new Error('UNKNOWN ACTION')
  }
}

export { initialState, reducer, Msg } 
