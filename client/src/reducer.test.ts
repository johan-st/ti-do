import { reducer, Msg } from './reducer'
const state:State = {
  lists:[{
    nodeId:'test01_ID',
    active:false,
    completed:true,
    subNodes:[{
      nodeId:'test03_ID',
      active:false,
      completed:true,
      subNodes:[],
      title:'test03',
      notes:'some notes'},
    {
      nodeId:'test03_ID',
      active:false,
      completed:false,
      subNodes:[],
      title:'test03',
      notes:'some notes'}
    ],
    title:'test01',
    notes:'some notes'},
  {
    nodeId:'test02_ID',
    active:false,
    completed:false,
    subNodes:[],
    title:'test01',
    notes:'some notes'}],

  editor:null
}
const item:ListNode = {
  nodeId:'test00_ID',
  active:false,
  completed:true,
  subNodes:[],
  title:'test00',
  notes:'some notes'
} 


test('ITEM_ADDED should add item to root when no parent given', () => {
  //act
  const expectedState = {
    ...state,
    lists:[...state.lists, item]
  }
  const newState = reducer({...state}, Msg.ITEM_ADDED(item, null))
  expect(newState).toStrictEqual(expectedState)
})
// test('ITEM_ADDED should add item to given parent', () => {
//   //act
//   const expectedState = {...state}
//   expectedState.lists[1].subNodes = [...expectedState.lists[1].subNodes, item] 
//   const newState = reducer({...state}, Msg.ITEM_ADDED(item, {...state.lists[1]}))
//   expect(newState).toStrictEqual(expectedState)
// })

  
// GOT_ITEMS: (list: ListNode[]):Msg => ({
// ITEM_ADDED: (item: ListNode):Msg => ({
// ITEM_CHANGED: (task: ListNode):Msg => ({
// ITEM_DELETED: (id:NodeId):Msg => ({ 