import { reducer, Msg } from './reducer'
let state:State
let stateCopy:State
let item:ListNode 

beforeEach((): void=>{
  // TODO: does ts not handle spread for {...obj} ?
  item =  {
    nodeId:'test00_ID',
    active:false,
    completed:true,
    subNodes:[],
    title:'test00',
    notes:'some notes'
  }
    
  state = {
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
        nodeId:'test04_ID',
        active:false,
        completed:false,
        subNodes:[],
        title:'test04',
        notes:'some notes'}
      ],
      title:'test01',
      notes:'some notes'},
    {
      nodeId:'test02_ID',
      active:false,
      completed:false,
      subNodes:[],
      title:'test02',
      notes:'some notes'}],
    editor:null}
  stateCopy = {
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
        nodeId:'test04_ID',
        active:false,
        completed:false,
        subNodes:[],
        title:'test04',
        notes:'some notes'}
      ],
      title:'test01',
      notes:'some notes'},
    {
      nodeId:'test02_ID',
      active:false,
      completed:false,
      subNodes:[],
      title:'test02',
      notes:'some notes'}],
    editor:null}
  item =  {
    nodeId:'test00_ID',
    active:false,
    completed:true,
    subNodes:[],
    title:'test00',
    notes:'some notes'
  }})  

test('ITEM_ADDED should add item to root when no parent given', () => {
  //act
  const newState = reducer({...state}, Msg.ITEM_ADDED(item, null))
  //assert
  const expectedState = {
    ...state,
    lists:[...state.lists, {...item}]
  }
  expect(newState).toStrictEqual(expectedState)
})
test('ITEM_ADDED should add item to given parent', () => {
  //act
  const newState = reducer({...state}, Msg.ITEM_ADDED({...item}, {...state.lists[1]}))
  //assert
  const expectedState = {
    ...stateCopy,
    lists:[...state.lists]}
  expectedState.lists[1].subNodes = [...expectedState.lists[1].subNodes, item] 
  expect(newState).toStrictEqual(expectedState)

})
test('GOT_ITEMS should update all roots and subnodes', () => {
  //act
  const newState = reducer({...state, lists: [item]}, Msg.GOT_ITEMS(state.lists))
  //assert
  const expectedState = {...state}
  expect(newState).toStrictEqual(expectedState)

})
test('ITEM_CHANGED should replace previous item with the one passed to the action', () => {
  //arange 
  const newNode1 = {...state.lists[0], notes:'changed'} 
  const newNode2 = {...state.lists[0].subNodes[0], notes:'changed'} 
  //act
  const newState1 = reducer({...state}, Msg.ITEM_CHANGED(newNode1))
  const newState2 = reducer(newState1, Msg.ITEM_CHANGED(newNode2))
  //assert
  stateCopy.lists[0].notes='changed'
  stateCopy.lists[0].subNodes[0].notes='changed'
  const expectedState = stateCopy
  
  expect(newState2).toStrictEqual(expectedState)
})
// ITEM_ADDED: (item: ListNode):Msg => ({...
// GOT_ITEMS: (list: ListNode[]):Msg => ({...
// ITEM_CHANGED: (task: ListNode):Msg => ({...
// ITEM_DELETED: (id:NodeId):Msg => ({


