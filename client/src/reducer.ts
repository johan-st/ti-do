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
  ITEM_DELETED: (id:NodeId):Msg => ({ 
    type: 'ITEM_DELETED', payload: id 
  })
}

const reducer = (state: State, action: Msg):State => {
  console.log(action)
  switch (action.type) {
  case 'DRAG_END':
    return {...state}
    // return dragEndHandler(action.payload as DropResult, state)
  
  case 'GOT_ITEMS':
    return { ...state, lists:(action.payload as ListNode[]) }

  case 'ITEM_ADDED':
    return { ...state, lists: [...state.lists, action.payload as ListNode]}

  case 'ITEM_CHANGED':
    return { ...state}

  case 'ITEM_DELETED':
    return {...state}

  default:
    throw new Error('UNKNOWN ACTION')
  }
}

// const dragEndHandler = (dropResult:DropResult, state:State):State=>{
//   const  {source, destination, draggableId, reason} = dropResult
//   const newState = {...state}
//   if (reason === 'CANCEL'
//     || source.droppableId === destination?.droppableId){
//     return newState
//   } 
//   if(source.droppableId === destination?.droppableId){
//     return newState
//   }
//   if (destination?.droppableId === 'rootDroppable') {
//     const  indexList = state.lists
//     return  {...state}
//   }
//   return  newState
// }

// const findRecc=(n:ListNode, m:NodeId, index:number, indexList:number[]) =>{
//   if (n.nodeId === m) {
//     return indexList
//   }
// }
export { initialState, reducer, Msg } 
