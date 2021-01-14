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
  ITEM_ADDED: (item: ListNode, parrent:ListNode | null):Msg => ({
    type: 'ITEM_ADDED',
    payload:{item, parrent},
  }),
  ITEM_CHANGED: (task: ListNode):Msg => ({
    type: 'ITEM_CHANGED',
    payload: task,
  }),
  ITEM_DELETED: (id:NodeId):Msg => ({ 
    type: 'ITEM_DELETED', payload: id 
  })
}
type ADDED_PAYLOAD={
  item:ListNode,
  parrent:ListNode|null
}
const reducer = (state: State, action: Msg):State => {
  // console.log(action)
  switch (action.type) {
  case 'DRAG_END':
    return {...state}
    // return dragEndHandler(action.payload as DropResult, state)
  
  case 'GOT_ITEMS':
    return { ...state, lists:(action.payload as ListNode[]) }

  case 'ITEM_ADDED':
  {
    const {parrent, item} = (action.payload as ADDED_PAYLOAD)
    //TODO: no recc structure yet
    if (parrent === null){
      return { ...state, 
        lists: [...state.lists,{...item, active:true}], 
        editor:item
      }
    }
    return { ...state, lists: state.lists.map((n) => {
      if (n.nodeId === parrent.nodeId) {
        return {...n, subNodes: [...n.subNodes, item]}
      }
      return n
    })}
    
  }
  case 'ITEM_CHANGED':
  {
    const item = action.payload as ListNode
    const newState = {
      ...state, 
      lists: state.lists.map(root=>{
        if (root.nodeId === item.nodeId) {
          return item
        }
        return {...root, subNodes:root.subNodes.map(sub=>{
          if (sub.nodeId === item.nodeId) {
            return item
          }
          return sub
        })}
      })}
    return newState
  
  }
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
